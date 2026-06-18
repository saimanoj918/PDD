import { NextResponse } from 'next/server';
import { getUserFromCookies } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const authUser = await getUserFromCookies();

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = authUser.id;

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

    // OTP is valid. Gather emails for notifications before deleting data
    const memberRoles = await prisma.domainMember.findMany({
      where: { userId: userId, role: { in: ['MEMBER', 'SUB_ADMIN'] } },
      include: { domain: true }
    });

    const adminRoles = await prisma.domainMember.findMany({
      where: { userId: userId, role: 'ADMIN' },
      include: { domain: true }
    });

    // 1. Get Admins/Sub-Admins for domains where user is a MEMBER or SUB_ADMIN to notify
    const memberDomainIds = memberRoles.map(m => m.domainId);
    let adminsToNotify: { userId: string, email: string, domainName: string }[] = [];
    if (memberDomainIds.length > 0) {
      const admins = await prisma.domainMember.findMany({
        where: { domainId: { in: memberDomainIds }, role: { in: ['ADMIN', 'SUB_ADMIN'] }, userId: { not: userId } },
        include: { user: true, domain: true }
      });
      adminsToNotify = admins.map(a => ({ userId: a.userId, email: a.user.email, domainName: a.domain.name }));
    }

    // 2. Get Members for domains where user is an ADMIN to notify
    const adminDomainIds = adminRoles.map(a => a.domainId);
    let membersToNotify: { userId: string, email: string, domainName: string }[] = [];
    if (adminDomainIds.length > 0) {
      const members = await prisma.domainMember.findMany({
        where: { domainId: { in: adminDomainIds }, userId: { not: userId } },
        include: { user: true, domain: true }
      });
      membersToNotify = members.map(m => ({ userId: m.userId, email: m.user.email, domainName: m.domain.name }));
    }

    // Proceed with Account Deletion in a transaction
    await prisma.$transaction(async (tx) => {
      // 1. Delete the OTP record so it can't be reused
      await tx.oTP.delete({ where: { id: otpRecord.id } });

      // 2. Delete all tasks assigned to the deleting user in any domain
      await tx.task.deleteMany({
        where: { assigneeId: userId }
      });

      // 3. Delete all domains they are an Admin of
      if (adminDomainIds.length > 0) {
        await tx.domain.deleteMany({
          where: {
            id: { in: adminDomainIds }
          }
        });
      }

      // 4. Delete the user
      await tx.user.delete({
        where: { id: userId }
      });
    }, {
      timeout: 15000 // 15 seconds timeout
    });

    // Create notifications for Admins and Domain Members in bulk outside the transaction
    const notificationsToCreate = [];
    for (const a of adminsToNotify) {
      notificationsToCreate.push({
        userId: a.userId,
        type: 'USER_DELETED_ACCOUNT',
        title: 'Member Account Deleted',
        content: `The member "${user.name}" has permanently deleted their account and left the domain "${a.domainName}".`
      });
    }
    for (const m of membersToNotify) {
      notificationsToCreate.push({
        userId: m.userId,
        type: 'ADMIN_DELETED_ACCOUNT',
        title: 'Domain Deleted (Admin Left)',
        content: `The admin "${user.name}" has permanently deleted their account, so the domain "${m.domainName}" has been deleted.`
      });
    }

    if (notificationsToCreate.length > 0) {
      await prisma.notification.createMany({
        data: notificationsToCreate
      });
    }

    // Fire off emails asynchronously in the background so it doesn't slow down the response
    sendDeletionNotifications(user.name, adminsToNotify, membersToNotify).catch(err => {
      console.error('Failed to send background deletion emails:', err);
    });

    // Clear the auth cookie to log them out
    const response = NextResponse.json({ success: true, message: 'Account deleted successfully' });
    response.cookies.set('auth-token', '', { path: '/', maxAge: 0, httpOnly: false });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error: any) {
    console.error('Delete account verify error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete account' }, { status: 500 });
  }
}

async function sendDeletionNotifications(
  deletedUserName: string, 
  adminsToNotify: { email: string, domainName: string }[], 
  membersToNotify: { email: string, domainName: string }[]
) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('[DEVELOPMENT MODE] Skipping deletion notification emails.');
    return;
  }

  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS.replace(/\s+/g, '')
    }
  });

  const promises = [];

  // Notify Admins that a Member left
  for (const admin of adminsToNotify) {
    promises.push(transporter.sendMail({
      from: `"Multi-Domain Scheduler" <${process.env.EMAIL_USER}>`,
      to: admin.email,
      subject: `Member Left Domain: ${admin.domainName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">Member Account Deleted</h2>
          <p>This is an automated notification to let you know that <strong>${deletedUserName}</strong> has permanently deleted their account.</p>
          <p>Because of this, they have been automatically removed from your domain: <strong>${admin.domainName}</strong>.</p>
        </div>
      `
    }));
  }

  // Notify Members that an Admin deleted the domain
  for (const member of membersToNotify) {
    promises.push(transporter.sendMail({
      from: `"Multi-Domain Scheduler" <${process.env.EMAIL_USER}>`,
      to: member.email,
      subject: `Domain Deleted: ${member.domainName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #ef4444;">Domain Deleted</h2>
          <p>This is an automated notification to let you know that the admin <strong>${deletedUserName}</strong> has permanently deleted their account.</p>
          <p>Because they were the administrator, the domain <strong>${member.domainName}</strong> and all its associated tasks have been permanently deleted.</p>
        </div>
      `
    }));
  }

  await Promise.allSettled(promises);
}
