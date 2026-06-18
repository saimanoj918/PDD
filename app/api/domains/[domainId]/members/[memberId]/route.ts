import { NextResponse } from 'next/server';
import { getUserFromCookies } from '@/lib/auth';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request, { params }: { params: Promise<{ domainId: string, memberId: string }> }) {
  try {
    const user = await getUserFromCookies();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { domainId, memberId } = await params;
    const { role } = await request.json();

    if (role !== 'SUB_ADMIN' && role !== 'MEMBER') {
      return NextResponse.json({ error: 'Invalid role specified' }, { status: 400 });
    }

    // Verify requesting user is an ADMIN of the domain
    const requesterMembership = await prisma.domainMember.findUnique({
      where: { userId_domainId: { userId: user.id, domainId } }
    });

    if (!requesterMembership || requesterMembership.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Only admins can modify roles' }, { status: 403 });
    }

    // Check if target member exists
    const targetMember = await prisma.domainMember.findUnique({
      where: { id: memberId }
    });

    if (!targetMember || targetMember.domainId !== domainId) {
      return NextResponse.json({ error: 'Member not found in this domain' }, { status: 404 });
    }

    if (targetMember.role === 'ADMIN') {
      return NextResponse.json({ error: 'Cannot modify admin role' }, { status: 400 });
    }

    if (role === 'SUB_ADMIN') {
      // Don't demote existing yet, wait until they accept
      const updatedMember = await prisma.domainMember.update({
        where: { id: memberId },
        data: { pendingRole: 'SUB_ADMIN' },
        include: {
          user: { select: { id: true, name: true, email: true } }
        }
      });
      return NextResponse.json({ member: updatedMember });
    }

    if (role === 'MEMBER') {
      // Direct demotion
      const updatedMember = await prisma.domainMember.update({
        where: { id: memberId },
        data: { role: 'MEMBER', pendingRole: null },
        include: {
          user: { select: { id: true, name: true, email: true } }
        }
      });
      return NextResponse.json({ member: updatedMember });
    }
    return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
  } catch (error) {
    console.error('Update member role error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ domainId: string, memberId: string }> }) {
  try {
    const user = await getUserFromCookies();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { domainId, memberId } = await params;

    // Verify requesting user role in the domain
    const requesterMembership = await prisma.domainMember.findUnique({
      where: { userId_domainId: { userId: user.id, domainId } }
    });

    if (!requesterMembership) {
      return NextResponse.json({ error: 'Not a member of this domain' }, { status: 403 });
    }

    // Check if target member exists
    const targetMember = await prisma.domainMember.findUnique({
      where: { id: memberId },
      include: { user: true }
    });

    if (!targetMember || targetMember.domainId !== domainId) {
      return NextResponse.json({ error: 'Member not found in this domain' }, { status: 404 });
    }

    if (targetMember.role === 'ADMIN') {
      return NextResponse.json({ error: 'Cannot remove the domain admin' }, { status: 400 });
    }

    // Allow self-removal (leaving a workspace) — requires password verification
    const isSelfRemoval = targetMember.userId === user.id;
    let reason = '';

    if (isSelfRemoval) {
      // Parse password and reason from request body
      let password = '';
      try {
        const body = await request.json();
        password = body.password || '';
        reason = body.reason || '';
      } catch {
        // No body provided
      }
      if (!password) {
        return NextResponse.json({ error: 'Password is required to leave a workspace' }, { status: 400 });
      }

      // Verify password
      const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
      if (!dbUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      const isValidPassword = await bcrypt.compare(password, dbUser.password);
      if (!isValidPassword) {
        return NextResponse.json({ error: 'Incorrect password' }, { status: 403 });
      }
    } else {
      // Role checks for removing others:
      // - ADMIN can remove anyone (SUB_ADMIN or MEMBER)
      // - SUB_ADMIN can only remove regular MEMBER
      if (requesterMembership.role !== 'ADMIN' && requesterMembership.role !== 'SUB_ADMIN') {
        return NextResponse.json({ error: 'Not authorized to remove members' }, { status: 403 });
      }

      if (requesterMembership.role === 'SUB_ADMIN' && targetMember.role === 'SUB_ADMIN') {
        return NextResponse.json({ error: 'Sub-admins cannot remove other sub-admins' }, { status: 403 });
      }
    }

    // Get the domain details (for the name)
    const domain = await prisma.domain.findUnique({
      where: { id: domainId }
    });

    if (!domain) {
      return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
    }

    // Proceed with deletion in a transaction:
    // 1. Delete all tasks assigned to the removed user in this domain
    // 2. Delete the DomainMember record
    await prisma.$transaction(async (tx) => {
      await tx.task.deleteMany({
        where: {
          domainId,
          assigneeId: targetMember.userId
        }
      });

      await tx.domainMember.delete({
        where: { id: memberId }
      });
    });

    if (isSelfRemoval) {
      // Notify admin and sub-admins that this member left
      const adminsAndSubAdmins = await prisma.domainMember.findMany({
        where: {
          domainId,
          role: { in: ['ADMIN', 'SUB_ADMIN'] }
        },
        select: { userId: true }
      });

      const leavingUserName = targetMember.user?.name || targetMember.user?.email || 'A member';
      const reasonText = reason ? `\nReason: "${reason}"` : '';

      await prisma.notification.createMany({
        data: adminsAndSubAdmins.map(m => ({
          userId: m.userId,
          type: 'MEMBER_LEFT',
          title: 'Member Left Workspace',
          content: `${leavingUserName} has left the workspace "${domain.name}".${reasonText}`
        }))
      });
    } else {
      // Create a notification for the removed user (admin-initiated removal)
      await prisma.notification.create({
        data: {
          userId: targetMember.userId,
          type: 'MEMBER_REMOVED',
          title: 'Removed from Team',
          content: `You have been removed from the domain "${domain.name}" by the team management.`
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Remove member error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
