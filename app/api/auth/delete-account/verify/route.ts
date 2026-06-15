import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jose from 'jose';
import prisma from '@/lib/prisma';

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

    const { otp } = await request.json();

    if (!otp) {
      return NextResponse.json({ error: 'Verification code is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify OTP
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        email: user.email,
        code: otp,
        expiresAt: {
          gt: new Date() // Must not be expired
        }
      }
    });

    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 });
    }

    // OTP is valid. Proceed with Account Deletion in a transaction
    await prisma.$transaction(async (tx) => {
      // 1. Delete the OTP record so it can't be reused
      await tx.oTP.delete({ where: { id: otpRecord.id } });

      // 2. Find all domains where this user is an ADMIN
      const adminMemberships = await tx.domainMember.findMany({
        where: {
          userId: userId,
          role: 'ADMIN'
        },
        select: {
          domainId: true
        }
      });

      const domainIdsToDelete = adminMemberships.map(m => m.domainId);

      // 3. Delete all domains they are an Admin of
      // Note: Because Prisma schema has onDelete: Cascade, deleting the Domain 
      // will automatically delete all Tasks and DomainMembers inside that domain.
      if (domainIdsToDelete.length > 0) {
        await tx.domain.deleteMany({
          where: {
            id: { in: domainIdsToDelete }
          }
        });
      }

      // 4. Delete the user
      // Note: Because Prisma schema has onDelete: Cascade, this will automatically delete
      // any remaining DomainMemberships (where they were just a MEMBER),
      // and any Tasks they created. It will also SetNull on assigneeId for tasks assigned to them.
      await tx.user.delete({
        where: { id: userId }
      });
    });

    // 5. Clear the auth cookie to log them out
    const response = NextResponse.json({ success: true, message: 'Account deleted successfully' });
    response.cookies.set('auth-token', '', { maxAge: 0 });

    return response;
  } catch (error: any) {
    console.error('Delete account verify error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete account' }, { status: 500 });
  }
}
