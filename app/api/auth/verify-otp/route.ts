import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and verification code are required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = String(otp).trim();

    // Find the OTP
    const validOtp = await prisma.oTP.findFirst({
      where: {
        email: cleanEmail,
        code: cleanOtp,
        expiresAt: {
          gt: new Date() // Must not be expired
        }
      }
    });

    if (!validOtp) {
      return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 });
    }

    // We do NOT delete the OTP here because /api/auth/register needs it to create the account.
    // We just confirm it's valid so the frontend can unlock the password field.
    return NextResponse.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Failed to verify code' }, { status: 500 });
  }
}
