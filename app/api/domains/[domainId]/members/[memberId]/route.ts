import { NextResponse } from 'next/server';
import { getUserFromCookies } from '@/lib/auth';
import prisma from '@/lib/prisma';

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

    // Role checks:
    // - ADMIN can remove anyone (SUB_ADMIN or MEMBER)
    // - SUB_ADMIN can only remove regular MEMBER
    if (requesterMembership.role !== 'ADMIN' && requesterMembership.role !== 'SUB_ADMIN') {
      return NextResponse.json({ error: 'Not authorized to remove members' }, { status: 403 });
    }

    if (requesterMembership.role === 'SUB_ADMIN' && targetMember.role === 'SUB_ADMIN') {
      return NextResponse.json({ error: 'Sub-admins cannot remove other sub-admins' }, { status: 403 });
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

    // Create a notification for the removed user
    await prisma.notification.create({
      data: {
        userId: targetMember.userId,
        type: 'MEMBER_REMOVED',
        title: 'Removed from Team',
        content: `You have been removed from the domain "${domain.name}" by the team management.`
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Remove member error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
