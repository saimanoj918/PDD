import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password, otp } = await request.json();

    if (!name || !email || !password || !otp) {
      return NextResponse.json({ error: 'Missing required fields including OTP' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {  
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Verify OTP
    const otpRecord = await prisma.oTP.findUnique({ where: { email } });
    if (!otpRecord) {
      return NextResponse.json({ error: 'Verification code expired or not requested' }, { status: 400 });
    }
    
    if (otpRecord.code !== otp) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }
    
    if (new Date() > otpRecord.expiresAt) {
      await prisma.oTP.delete({ where: { email } });
      return NextResponse.json({ error: 'Verification code has expired' }, { status: 400 });
    }

    // OTP is valid, clean it up
    await prisma.oTP.delete({ where: { email } });

    const hashedPassword = await bcrypt.hash(password, 10);
 
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const response = NextResponse.json({ 
      user: { id: user.id, name: user.name, email: user.email },
      message: 'Account created successfully'
    }, { status: 201 });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
