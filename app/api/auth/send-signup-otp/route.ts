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

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' }, 
        { status: 409 }
      );
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

    // Configure Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS?.replace(/\s+/g, '') // remove accidental spaces
        }
      });

      const mailOptions = {
        from: `"Multi-Domain Scheduler" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Registration Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #10b981; text-align: center;">Verify Your Email</h2>
            <p>Thank you for signing up! To complete your registration, please use the following verification code:</p>
            <div style="text-align: center; margin: 30px 0;">
               <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1e293b; padding: 10px 20px; background-color: #f1f5f9; border-radius: 8px;">${otp}</span>
            </div>
            <p>This code will expire in 15 minutes. If you did not sign up for an account, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">Multi-Domain Work Scheduler</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn(`[DEVELOPMENT/TEST MODE] SMTP credentials missing. OTP for ${email} is: ${otp}`);
      // If we are missing email configs, we return the OTP in the response 
      // so the user can easily test the UI without configuring an email server.
      return NextResponse.json({ 
        success: true, 
        message: 'Verification code sent successfully', 
        devOtp: otp // Send it to the frontend for easy testing
      });
    }

    return NextResponse.json({ success: true, message: 'Verification code sent successfully' });
  } catch (error: any) {
    console.error('Send signup OTP error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to send verification code' }, { status: 500 });
  }
}
