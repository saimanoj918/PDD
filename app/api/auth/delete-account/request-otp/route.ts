import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key-for-development');
    const { payload } = await jose.jwtVerify(token, secret);
    const userId = payload.id as string;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const email = user.email;

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Delete existing OTPs for this email
    await prisma.oTP.deleteMany({
      where: { email }
    });

    // Save new OTP
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
        subject: 'Account Deletion Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #ef4444; text-align: center;">Account Deletion Request</h2>
            <p>We received a request to permanently delete your account. This action cannot be undone.</p>
            <p>If you wish to proceed, here is your verification code:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #ef4444; padding: 10px 20px; background-color: #fee2e2; border-radius: 8px;">${otp}</span>
            </div>
            <p>This code will expire in 15 minutes. If you did not request this, please ignore this email and change your password immediately.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">Multi-Domain Work Scheduler</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn(`[DEVELOPMENT/TEST MODE] OTP for account deletion (${email}) is: ${otp}`);
      // Send it in the response for local testing
      return NextResponse.json({ success: true, devOtp: otp });
    }

    return NextResponse.json({ success: true, message: 'Verification code sent' });
  } catch (error: any) {
    console.error('Delete account request OTP error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to send verification code' }, { status: 500 });
  }
}
