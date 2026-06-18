import { NextResponse } from 'next/server';
import { getUserFromCookies } from '@/lib/auth';
import prisma from '@/lib/prisma';

// POST /api/domains/[domainId]/tasks/[taskId]/approve
// Admin or Sub-Admin approves a PENDING_APPROVAL task → marks COMPLETED, notifies assignee
export async function POST(
  request: Request,
  { params }: { params: Promise<{ domainId: string; taskId: string }> }
) {
  try {
    const user = await getUserFromCookies();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { domainId, taskId } = await params;

    // Only ADMIN or SUB_ADMIN can approve
    const membership = await prisma.domainMember.findUnique({
      where: { userId_domainId: { userId: user.id, domainId } }
    });

    if (!membership || (membership.role !== 'ADMIN' && membership.role !== 'SUB_ADMIN')) {
      return NextResponse.json({ error: 'Only Admins or Sub-Admins can approve tasks' }, { status: 403 });
    }

    const task = await prisma.task.findUnique({ where: { id: taskId, domainId } });
    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    if (task.status !== 'PENDING_APPROVAL') {
      return NextResponse.json({ error: 'Task is not awaiting approval' }, { status: 400 });
    }

    // Mark task as COMPLETED
    const updatedTask = await prisma.task.update({
      where: { id: taskId, domainId },
      data: { status: 'COMPLETED' },
      include: { assignee: { select: { id: true, name: true } } }
    });

    // Delete any pending task approval request notifications for this task
    await prisma.notification.deleteMany({
      where: {
        type: 'TASK_APPROVAL_REQUEST',
        content: {
          contains: taskId
        }
      }
    });

    // Notify the assignee that their task was approved
    if (updatedTask.assigneeId) {
      await prisma.notification.create({
        data: {
          userId: updatedTask.assigneeId,
          type: 'TASK_APPROVED',
          title: '✅ Task Approved',
          content: `Your task "${task.title}" has been approved and marked as Completed by ${user.name}.`
        }
      });
    }

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error('Approve task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/domains/[domainId]/tasks/[taskId]/approve
// Admin or Sub-Admin declines a PENDING_APPROVAL task → marks REASSIGNED, notifies assignee
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ domainId: string; taskId: string }> }
) {
  try {
    const user = await getUserFromCookies();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { domainId, taskId } = await params;

    // Only ADMIN or SUB_ADMIN can decline
    const membership = await prisma.domainMember.findUnique({
      where: { userId_domainId: { userId: user.id, domainId } }
    });

    if (!membership || (membership.role !== 'ADMIN' && membership.role !== 'SUB_ADMIN')) {
      return NextResponse.json({ error: 'Only Admins or Sub-Admins can decline tasks' }, { status: 403 });
    }

    const task = await prisma.task.findUnique({ where: { id: taskId, domainId } });
    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    if (task.status !== 'PENDING_APPROVAL') {
      return NextResponse.json({ error: 'Task is not awaiting approval' }, { status: 400 });
    }

    // Mark task as REASSIGNED
    const updatedTask = await prisma.task.update({
      where: { id: taskId, domainId },
      data: { status: 'REASSIGNED' },
      include: { assignee: { select: { id: true, name: true } } }
    });

    // Delete any pending task approval request notifications for this task
    await prisma.notification.deleteMany({
      where: {
        type: 'TASK_APPROVAL_REQUEST',
        content: {
          contains: taskId
        }
      }
    });

    // Notify the assignee that their task was declined and reassigned
    if (updatedTask.assigneeId) {
      await prisma.notification.create({
        data: {
          userId: updatedTask.assigneeId,
          type: 'TASK_DECLINED',
          title: '🔄 Task Reassigned',
          content: `Your completion request for "${task.title}" was declined by ${user.name}. The task has been marked as Reassigned — please review and try again.`
        }
      });
    }

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error('Decline task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
