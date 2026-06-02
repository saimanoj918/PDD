import { NextResponse } from 'next/server';
import { getUserFromCookies } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ domainId: string }> }) {
  try {
    const user = await getUserFromCookies();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { domainId } = await params;

    // Check if user is member
    const isMember = await prisma.domainMember.findUnique({
      where: { userId_domainId: { userId: user.id, domainId } }
    });

    if (!isMember) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const tasks = await prisma.task.findMany({
      where: { domainId },
      include: {
        assignee: { select: { id: true, name: true } },
        creator: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ domainId: string }> }) {
  try {
    const user = await getUserFromCookies();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { domainId } = await params;
    const { title, description, priority, dueDate, assigneeId: providedAssigneeId } = await request.json();

    if (!title) return NextResponse.json({ error: 'Title required' }, { status: 400 });

    // Verify membership
    const isMember = await prisma.domainMember.findUnique({
      where: { userId_domainId: { userId: user.id, domainId } }
    });

    if (!isMember) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // Intelligent Scheduling Logic
    // Find all members of the domain
    const members = await prisma.domainMember.findMany({
      where: { domainId },
      include: {
        user: {
          include: {
            tasks: {
              where: {
                domainId,
                status: { in: ['PENDING', 'IN_PROGRESS'] }
              }
            }
          }
        }
      }
    });

    if (members.length === 0) {
        return NextResponse.json({ error: 'No members in domain' }, { status: 400 });
    }

    let finalAssigneeId = providedAssigneeId;
    if (!finalAssigneeId) {
      // Sort members by their current active task count (ascending)
      const sortedMembers = members.sort((a, b) => a.user.tasks.length - b.user.tasks.length);
      finalAssigneeId = sortedMembers[0].userId;
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        domainId,
        creatorId: user.id,
        assigneeId: finalAssigneeId
      },
      include: {
        assignee: { select: { id: true, name: true } }
      }
    });

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
