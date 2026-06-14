import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't leak whether the email exists or not for security
      return NextResponse.json({ success: true });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Delete any existing OTPs for this email to prevent spam
    await prisma.oTP.deleteMany({
      where: { email }
    });

    // Save new OTP to database
    await prisma.oTP.create({
      data: {
        email,
        code: otp,
        expiresAt
      }
    });

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS?.replace(/\s+/g, '')
        }
      });

      const mailOptions = {
        from: `"Multi-Domain Scheduler" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #4f46e5; text-align: center;">Reset Your Password</h2>
            <p>We received a request to reset your password. Here is your verification code:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1e293b; padding: 10px 20px; background-color: #f1f5f9; border-radius: 8px;">${otp}</span>
            </div>
            <p>This code will expire in 15 minutes. If you did not request this reset, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">Multi-Domain Work Scheduler</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn(`[DEVELOPMENT/TEST MODE] SMTP credentials missing. OTP for ${email} is: ${otp}`);
      return NextResponse.json({ 
        success: true, 
        devOtp: otp // Send it to the frontend for easy testing
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to process request' }, { status: 500 });
  }
}
