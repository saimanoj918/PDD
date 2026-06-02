import { NextResponse } from 'next/server';
import { getUserFromCookies } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ domainId: string, taskId: string }> }) {
  try {
    const user = await getUserFromCookies();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { domainId, taskId } = await params;
    const { title, description, priority, status, dueDate } = await request.json();

    // Verify user is in the domain
    const membership = await prisma.domainMember.findUnique({
      where: { userId_domainId: { userId: user.id, domainId } }
    });

    if (!membership) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const taskToUpdate = await prisma.task.findUnique({ where: { id: taskId, domainId } });
    if (!taskToUpdate) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Only allow update if: User is ADMIN, User is SUB_ADMIN, or User is the assignee
    if (membership.role !== 'ADMIN' && membership.role !== 'SUB_ADMIN' && taskToUpdate.assigneeId !== user.id) {
      return NextResponse.json({ error: 'You are not authorized to modify this task' }, { status: 403 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId, domainId },
      data: { 
        title, 
        description, 
        priority, 
        status,
        dueDate: dueDate ? new Date(dueDate) : null
      }
    });

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error('Update task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ domainId: string, taskId: string }> }) {
  try {
    const user = await getUserFromCookies();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { domainId, taskId } = await params;

    // Verify user is in the domain
    const membership = await prisma.domainMember.findUnique({
      where: { userId_domainId: { userId: user.id, domainId } }
    });

    if (!membership) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const taskToDelete = await prisma.task.findUnique({ where: { id: taskId, domainId } });
    if (!taskToDelete) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Only allow delete if: User is ADMIN or User is SUB_ADMIN (MEMBER cannot delete tasks even if assigned)
    if (membership.role !== 'ADMIN' && membership.role !== 'SUB_ADMIN') {
      return NextResponse.json({ error: 'You are not authorized to delete tasks' }, { status: 403 });
    }

    await prisma.task.delete({
      where: { id: taskId, domainId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
