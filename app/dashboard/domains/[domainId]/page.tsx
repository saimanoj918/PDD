'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { CheckSquare, User, Clock, Users, UserPlus, Send, Trash2, Edit2, X, Save, Calendar, CheckCircle, XCircle, MoreVertical, Check } from 'lucide-react';
import styles from './page.module.css';

export default function DomainDetail({ params }: { params: Promise<{ domainId: string }> }) {
  const resolvedParams = use(params);
  const { domainId } = resolvedParams;
  const router = useRouter();
  
  const [domainName, setDomainName] = useState('');
  const [domainTemplate, setDomainTemplate] = useState('');
  const [domainDesc, setDomainDesc] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getTaskOptions = (domain: string) => {
    if (domain === 'Room Core') {
      return ['Breakfast', 'Lunch', 'Dinner', 'Cleaning', 'Dish Washing', 'Clothes Washing'];
    }
    if (domain === 'College Project') {
      return ['module', 'report', 'ppt', 'onepage', 'thankyou card', 'hardware'];
    }
    if (domain === 'Software Team') {
      return ['frontend', 'backend', 'debug', 'testing'];
    }
    return [];
  };

  const taskOptions = getTaskOptions(domainTemplate);
  
  // Create Task State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [creating, setCreating] = useState(false);
  const [creatingAll, setCreatingAll] = useState(false);

  // Edit Domain State
  const [editingDomain, setEditingDomain] = useState(false);
  const [editDomainName, setEditDomainName] = useState('');
  const [editDomainDesc, setEditDomainDesc] = useState('');

  // Edit Task State
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editTaskDesc, setEditTaskDesc] = useState('');
  const [editTaskStatus, setEditTaskStatus] = useState('PENDING');
  const [editTaskDueDate, setEditTaskDueDate] = useState('');

  // Invite Member State
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [domainId]);

  // Reactively refresh members when someone accepts an invitation to this domain
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`/api/domains/${domainId}/members`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setMembers(data.members);
        }
      } catch (err) {
        console.error('Failed to refresh members:', err);
      }
    };

    const handleMembershipUpdate = (e: Event) => {
      const event = e as CustomEvent;
      // Only refresh if the event is for this specific domain
      if (!event.detail?.domainId || event.detail.domainId === domainId) {
        fetchMembers();
      }
    };

    window.addEventListener('domain-membership-updated', handleMembershipUpdate);
    return () => window.removeEventListener('domain-membership-updated', handleMembershipUpdate);
  }, [domainId]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.menuContainer}`)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, membersRes, domainsRes, meRes] = await Promise.all([
        fetch(`/api/domains/${domainId}/tasks`, { cache: 'no-store' }),
        fetch(`/api/domains/${domainId}/members`, { cache: 'no-store' }),
        fetch(`/api/domains`, { cache: 'no-store' }), // Quick way to get domain details
        fetch(`/api/auth/me`, { cache: 'no-store' })
      ]);

      if (meRes.ok) {
        const data = await meRes.json();
        setCurrentUser(data.user);
      }

      if (tasksRes.ok) {
        const data = await tasksRes.json();
        setTasks(data.tasks);
      }
      if (membersRes.ok) {
        const data = await membersRes.json();
        setMembers(data.members);
      }
      if (domainsRes.ok) {
        const data = await domainsRes.json();
        const currentDomain = data.domains.find((d: any) => d.id === domainId);
        if (currentDomain) {
          setDomainName(currentDomain.name);
          setDomainTemplate(currentDomain.template || currentDomain.name);
          setDomainDesc(currentDomain.description || '');
          setEditDomainName(currentDomain.name);
          setEditDomainDesc(currentDomain.description || '');
          
          const options = getTaskOptions(currentDomain.template || currentDomain.name);
          if (options.length > 0 && !title) {
            setTitle(options[0]);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch(`/api/domains/${domainId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          description, 
          assigneeId: assigneeId === '' ? undefined : assigneeId,
          dueDate: dueDate ? dueDate : undefined
        }),
      });
      if (res.ok) {
        const options = getTaskOptions(domainTemplate);
        setTitle(options.length > 0 ? options[0] : '');
        setDescription('');
        setAssigneeId('');
        setDueDate('');
        fetchData();
      }
    } finally {
      setCreating(false);
    }
  };

  const handleAutoAssignAllChores = async () => {
    if (members.length === 0) {
      alert('You need team members to auto-assign chores!');
      return;
    }
    setCreatingAll(true);
    try {
      const dailyTasks = ['Breakfast', 'Lunch', 'Dinner', 'Cleaning'];
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const acceptedMembers = members.filter(m => m.status === 'ACCEPTED');
      if (acceptedMembers.length === 0) {
        alert('You need accepted team members to auto-assign chores!');
        setCreatingAll(false);
        return;
      }
      const shuffledMembers = [...acceptedMembers].sort(() => 0.5 - Math.random());
      
      let memberIndex = 0;
      
      for (const day of days) {
        const dueDate = getNextDayOfWeek(day);
        
        for (const title of dailyTasks) {
          const assignee = shuffledMembers[memberIndex % shuffledMembers.length];
          memberIndex++;
          
          await fetch(`/api/domains/${domainId}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              title, 
              description: '', 
              assigneeId: assignee.userId,
              dueDate
            }),
          });
        }
      }
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingAll(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      const res = await fetch(`/api/domains/${domainId}/tasks/${taskId}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const startEditingTask = (task: any) => {
    setEditingTaskId(task.id);
    setEditTaskTitle(task.title);
    setEditTaskDesc(task.description || '');
    setEditTaskStatus(task.status);
    setEditTaskDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
  };

  const handleUpdateTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/domains/${domainId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: editTaskTitle, 
          description: editTaskDesc, 
          status: editTaskStatus,
          dueDate: editTaskDueDate ? editTaskDueDate : undefined
        }),
      });
      if (res.ok) {
        setEditingTaskId(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateDomain = async () => {
    try {
      const res = await fetch(`/api/domains/${domainId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editDomainName, description: editDomainDesc }),
      });
      if (res.ok) {
        setEditingDomain(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDomain = async () => {
    if (!confirm('WARNING: Are you sure you want to delete this entire workspace and all its tasks? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/domains/${domainId}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInviting(true);
    setInviteError('');
    setInviteSuccess('');
    try {
      const res = await fetch(`/api/domains/${domainId}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail }),
      });
      if (res.ok) {
        setInviteEmail('');
        setInviteSuccess('Member added successfully!');
        fetchData();
        setTimeout(() => setInviteSuccess(''), 3000);
      } else {
        const data = await res.json();
        setInviteError(data.error || 'Failed to add member');
      }
    } finally {
      setInviting(false);
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/domains/${domainId}/members/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member? This will remove them from the domain, delete all their assigned tasks, and send them a notification.')) return;
    try {
      const res = await fetch(`/api/domains/${domainId}/members/${memberId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const isSelf = members.find(m => m.id === memberId)?.userId === currentUser?.id;
        if (isSelf) {
          router.push('/dashboard');
          router.refresh();
        } else {
          fetchData();
        }
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to remove member');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getDeadlineText = (dueDateStr: string | null, domain: string) => {
    if (!dueDateStr) return <span style={{color: 'var(--text-secondary)'}}>No date set</span>;
    
    // We add timezone offset so the local date matches the inputted YYYY-MM-DD precisely without shifting a day backwards
    const due = new Date(dueDateStr);
    const formattedDate = new Date(due.getTime() + due.getTimezoneOffset() * 60000).toLocaleDateString();
    
    if (domain === 'Room Core') {
      const weekday = new Date(due.getTime() + due.getTimezoneOffset() * 60000).toLocaleDateString('en-US', { weekday: 'long' });
      return <span style={{color: 'var(--text-primary)', fontWeight: 500}}>{weekday}</span>;
    }

    due.setHours(0, 0, 0, 0); 
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let remainingText: React.ReactNode = '';
    if (diffDays < 0) remainingText = <span style={{color: 'var(--danger)', fontWeight: 600}}>({Math.abs(diffDays)} days overdue)</span>;
    else if (diffDays === 0) remainingText = <span style={{color: 'var(--accent-secondary)', fontWeight: 600}}>(Due today!)</span>;
    else if (diffDays === 1) remainingText = <span style={{color: 'var(--accent-secondary)'}}>(Due tomorrow)</span>;
    else remainingText = <span>({diffDays} days remaining)</span>;

    return <span>Deadline: {formattedDate} {remainingText}</span>;
  };

  const formatFormDate = (dateStr: string, domain: string) => {
    if (!dateStr) return '';
    if (domain === 'Room Core') {
      const d = new Date(dateStr);
      return new Date(d.getTime() + d.getTimezoneOffset() * 60000).toLocaleDateString('en-US', { weekday: 'long' });
    }
    return dateStr;
  };

  const getNextDayOfWeek = (dayName: string) => {
    if (!dayName) return '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDay = days.indexOf(dayName);
    if (targetDay === -1) return '';
    
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const currentDay = d.getDay();
    let diff = targetDay - currentDay;
    if (diff < 0) diff += 7; // Get next occurrence if it's past
    if (diff === 0) diff = 7; // If today, get next week (optional, let's just make it today if it matches)
    // Actually, if they say 'Monday' and today is 'Monday', let's set it to today. So remove diff === 0 line.
    
    d.setDate(d.getDate() + diff);
    // return YYYY-MM-DD
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().split('T')[0];
  };

  const isAdmin = members.find(m => m.userId === currentUser?.id)?.role === 'ADMIN';
  const isSubAdmin = members.find(m => m.userId === currentUser?.id)?.role === 'SUB_ADMIN';
  const canManageTasks = isAdmin || isSubAdmin;
  const allowsSubAdmin = domainTemplate === 'Software Team' || domainTemplate === 'College Project';

  const handleToggleTaskStatus = async (task: any, newStatus: string) => {
    try {
      const res = await fetch(`/api/domains/${domainId}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: task.title, 
          description: task.description, 
          priority: task.priority, 
          status: newStatus,
          dueDate: task.dueDate
        })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Approve a task completion request (Admin/Sub-Admin only)
  const handleApproveTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/domains/${domainId}/tasks/${taskId}/approve`, { method: 'POST' });
      if (res.ok) {
        fetchData();
        window.dispatchEvent(new Event('messages-updated'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Decline a task completion request (Admin/Sub-Admin only)
  const handleDeclineTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/domains/${domainId}/tasks/${taskId}/approve`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
        window.dispatchEvent(new Event('messages-updated'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading domain...</div>;

  return (
    <div className={`${styles.domainDetail} animate-fade-in`}>
      <div className={styles.header} style={{ marginBottom: '2rem' }}>
        <div className={styles.titleArea}>
          {editingDomain ? (
            <div className="glass-panel" style={{ padding: '1.5rem', width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input 
                className="input-field" 
                value={editDomainName} 
                onChange={e => setEditDomainName(e.target.value)} 
                placeholder="Workspace Name"
                autoFocus
              />
              <textarea 
                className="input-field" 
                value={editDomainDesc} 
                onChange={e => setEditDomainDesc(e.target.value)} 
                placeholder="Description"
                rows={2}
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button className="btn-primary" onClick={handleUpdateDomain}><Save size={16} /> Save Changes</button>
                <button className="btn-secondary" onClick={() => setEditingDomain(false)}><X size={16} /> Cancel</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>{domainName || 'Domain Dashboard'}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {domainTemplate} Template
                  </span>
                </div>
                {domainDesc && (
                  <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px' }}>
                    {domainDesc}
                  </p>
                )}
              </div>
              {isAdmin && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-icon" onClick={() => setEditingDomain(true)} title="Edit Workspace Details">
                    <Edit2 size={18} />
                  </button>
                  <button className="btn-icon text-danger" onClick={handleDeleteDomain} title="Delete Workspace">
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.tasksSection}>
          <h3><CheckSquare size={20} /> Active Tasks</h3>
          
          {tasks.length === 0 ? (
            <div className={styles.emptyState}>
              No tasks yet. Create one to see the intelligent auto-assignment!
            </div>
          ) : (
            <div className={styles.taskList}>
              {[...tasks].sort((a, b) => {
                if (a.assigneeId === currentUser?.id && b.assigneeId !== currentUser?.id) return -1;
                if (b.assigneeId === currentUser?.id && a.assigneeId !== currentUser?.id) return 1;
                return 0;
              }).map(task => (
                <div key={task.id} className={styles.taskCard}>
                  {editingTaskId === task.id ? (
                    <div className={styles.editTaskForm}>
                      {taskOptions.length > 0 ? (
                        <>
                          <input 
                            className="input-field" 
                            value={editTaskTitle} 
                            onChange={e => setEditTaskTitle(e.target.value)} 
                            list={`edit-tasks-${task.id}`}
                            placeholder="Select or type task title..."
                            required 
                          />
                          <datalist id={`edit-tasks-${task.id}`}>
                            {taskOptions.map(opt => <option key={opt} value={opt} />)}
                          </datalist>
                        </>
                      ) : (
                        <input className="input-field" value={editTaskTitle} onChange={e => setEditTaskTitle(e.target.value)} />
                      )}
                      
                      {domainTemplate !== 'Room Core' && (
                        <textarea className="input-field" value={editTaskDesc} onChange={e => setEditTaskDesc(e.target.value)} />
                      )}
                      
                      <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Status</label>
                          <select className="input-field" value={editTaskStatus} onChange={e => setEditTaskStatus(e.target.value)}>
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                          </select>
                        </div>
                        <div style={{ flex: 1, position: 'relative' }}>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{domainTemplate === 'Room Core' ? 'Day' : 'Deadline'}</label>
                          {domainTemplate === 'Room Core' ? (
                            <select 
                              className="input-field" 
                              value={editTaskDueDate ? formatFormDate(editTaskDueDate, domainTemplate) : ''}
                              onChange={(e) => setEditTaskDueDate(getNextDayOfWeek(e.target.value))}
                            >
                              <option value="">Select day...</option>
                              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <option key={day} value={day}>{day}</option>
                              ))}
                            </select>
                          ) : (
                            <>
                              <button 
                                type="button" 
                                className="input-field" 
                                style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} 
                                onClick={() => {
                                  const el = document.getElementById(`edit-date-${task.id}`);
                                  if (el && 'showPicker' in el) (el as any).showPicker();
                                }}
                              >
                                <span style={{ color: editTaskDueDate ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                  {editTaskDueDate || 'Set deadline...'}
                                </span>
                                <Calendar size={16} style={{ color: 'var(--text-secondary)' }} />
                              </button>
                              <input 
                                id={`edit-date-${task.id}`}
                                type="date" 
                                style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                                value={editTaskDueDate} 
                                onChange={e => setEditTaskDueDate(e.target.value)} 
                              />
                            </>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-primary" onClick={() => handleUpdateTask(task.id)}>Save Changes</button>
                        <button className="btn-secondary" onClick={() => setEditingTaskId(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={styles.taskHeader}>
                        <div>
                          <h4 className={styles.taskTitle}>{task.title}</h4>
                          {domainTemplate !== 'Room Core' && task.description && <p className={styles.taskDesc}>{task.description}</p>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          {(canManageTasks || task.assigneeId === currentUser?.id) ? (
                            task.status === 'PENDING_APPROVAL' ? (
                              canManageTasks ? (
                                // Admin/Sub-Admin: show Approve & Decline buttons
                                <>
                                  <button 
                                    className="btn-icon" 
                                    style={{ color: 'var(--success)' }}
                                    onClick={() => handleApproveTask(task.id)}
                                    title="Approve — Mark as Completed"
                                  >
                                    <CheckCircle size={16} />
                                  </button>
                                  <button 
                                    className="btn-icon" 
                                    style={{ color: 'var(--danger)' }}
                                    onClick={() => handleDeclineTask(task.id)}
                                    title="Decline — Reassign task"
                                  >
                                    <XCircle size={16} />
                                  </button>
                                </>
                              ) : (
                                // Member: show waiting badge
                                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                                  ⏳ Awaiting Approval
                                </span>
                              )
                            ) : task.status === 'REASSIGNED' ? (
                              // REASSIGNED: let the member re-submit or admin can override
                              task.assigneeId === currentUser?.id ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--danger)', background: 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                                    🔄 Reassigned — Check Messages
                                  </span>
                                  <button 
                                    className="btn-icon" 
                                    style={{ color: 'var(--success)' }}
                                    onClick={() => handleToggleTaskStatus(task, 'COMPLETED')}
                                    title="Re-submit for Approval"
                                  >
                                    <CheckCircle size={16} />
                                  </button>
                                </div>
                              ) : canManageTasks ? (
                                <button 
                                  className="btn-icon" 
                                  style={{ color: 'var(--success)' }}
                                  onClick={() => handleToggleTaskStatus(task, 'COMPLETED')}
                                  title="Mark as Completed (override)"
                                >
                                  <CheckCircle size={16} />
                                </button>
                              ) : (
                                <div style={{ width: 16, height: 16 }}></div>
                              )
                            ) : (
                              <button 
                                className="btn-icon" 
                                style={{ color: task.status === 'COMPLETED' ? 'var(--warning)' : 'var(--success)' }}
                                onClick={() => handleToggleTaskStatus(task, task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED')}
                                title={task.status === 'COMPLETED' ? "Mark as Pending" : "Mark as Completed"}
                              >
                                {task.status === 'COMPLETED' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                              </button>
                            )
                          ) : (
                            <div style={{ width: 16, height: 16 }}></div>
                          )}
                          {canManageTasks && (
                            <>
                              <button className="btn-icon" onClick={() => startEditingTask(task)}><Edit2 size={16} /></button>
                              <button className="btn-icon text-danger" onClick={() => handleDeleteTask(task.id)}><Trash2 size={16} /></button>

                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className={styles.taskFooter} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                          <div className={styles.assignee}>
                            <User size={14} />
                            {task.assignee ? `Assigned to: ${task.assignee.name}` : 'Unassigned'}
                          </div>
                          <span className={`${styles.statusBadge} ${styles[`status-${task.status}`]}`}>
                            {task.status === 'PENDING_APPROVAL' ? 'PENDING APPROVAL'
                              : task.status === 'REASSIGNED' ? 'REASSIGNED'
                              : task.status === 'IN_PROGRESS' ? 'IN PROGRESS'
                              : task.status}
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', width: '100%', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                          {domainTemplate !== 'Room Core' && (
                            <div style={{ color: 'var(--text-secondary)' }}>
                              <strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Calendar size={12} style={{ color: 'var(--text-secondary)' }} />
                            {getDeadlineText(task.dueDate, domainTemplate)}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.sidebar}>
          <div className={styles.membersSection}>
            <h3><Users size={20} /> Team Members</h3>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div className={styles.memberList}>
                {members.map(member => (
                  <div key={member.id} className={styles.memberItem}>
                    <div className={styles.memberAvatar}>
                      {member.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.memberInfo}>
                      <div className={styles.memberName}>
                        {member.user.name}
                        {member.status === 'PENDING' && <span style={{ fontSize: '0.7rem', color: 'var(--warning)', marginLeft: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>Pending</span>}
                      </div>
                      <div className={styles.memberRole}>
                        {member.role === 'SUB_ADMIN' ? (
                          <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sub-Admin</span>
                        ) : (
                          member.role
                        )}
                      </div>
                    </div>
                    {((isAdmin && member.role !== 'ADMIN') || (isSubAdmin && member.role === 'MEMBER')) && (
                      <div className={styles.menuContainer}>
                        <button 
                          className={styles.menuButton} 
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === member.id ? null : member.id);
                          }}
                          title="Member Options"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openMenuId === member.id && (
                          <div className={styles.dropdownMenu} onClick={(e) => e.stopPropagation()}>
                            {isAdmin && allowsSubAdmin && (
                              <>
                                {member.role === 'SUB_ADMIN' ? (
                                  <button 
                                    className={styles.menuItem} 
                                    onClick={() => {
                                      handleUpdateRole(member.id, 'MEMBER');
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    Change Subadmin
                                  </button>
                                ) : member.pendingRole === 'SUB_ADMIN' ? (
                                  <button 
                                    className={`${styles.menuItem} ${styles.menuItemDisabled}`}
                                    disabled
                                  >
                                    Invited as Sub-Admin
                                  </button>
                                ) : (
                                  <button 
                                    className={styles.menuItem} 
                                    onClick={() => {
                                      handleUpdateRole(member.id, 'SUB_ADMIN');
                                      setOpenMenuId(null);
                                    }}
                                  >
                                    Make Sub-Admin
                                  </button>
                                )}
                              </>
                            )}
                            <button 
                              className={`${styles.menuItem} ${styles.menuItemDanger}`}
                              onClick={() => {
                                handleRemoveMember(member.id);
                                setOpenMenuId(null);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {canManageTasks && (
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.875rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <UserPlus size={16} /> Invite Member
                  </h4>
                  {inviteError && <div style={{ color: 'var(--danger)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{inviteError}</div>}
                  {inviteSuccess && <div style={{ color: 'var(--success)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{inviteSuccess}</div>}
                  <form onSubmit={handleAddMember} className={styles.addMemberForm}>
                    <input type="email" placeholder="User's email..." className={styles.addMemberInput} value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required />
                    <button type="submit" className={styles.addMemberBtn} disabled={inviting} title="Add Member"><Send size={16} /></button>
                  </form>
                </div>
              )}
            </div>
          </div>

          <div className={styles.formSection}>
            <h3><Clock size={20} /> Create Task</h3>
            {canManageTasks ? (
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                {domainTemplate === 'Room Core' && (
                  <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      Automatically generate and distribute all standard room chores evenly among your team members.
                    </p>
                    <button 
                      className="btn-primary" 
                      onClick={handleAutoAssignAllChores} 
                      disabled={creatingAll}
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <Users size={18} />
                      {creatingAll ? 'Distributing Chores...' : 'Auto-Assign All Chores'}
                    </button>
                  </div>
                )}
                
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Add Individual Task</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Assign a task manually, or leave it on Auto-Assign to give it to the team member with the lowest workload.
                </p>
                <form onSubmit={handleCreateTask}>
                  <div className="input-group">
                    <label className="input-label">Task Title</label>
                    {taskOptions.length > 0 ? (
                      <>
                        <input 
                          type="text" 
                          className="input-field" 
                          value={title} 
                          onChange={(e) => setTitle(e.target.value)} 
                          list="create-tasks"
                          placeholder="Select or type task title..."
                          required 
                        />
                        <datalist id="create-tasks">
                          {taskOptions.map(opt => <option key={opt} value={opt} />)}
                        </datalist>
                      </>
                    ) : (
                      <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    )}
                  </div>
                  <div className="input-group" style={{ position: 'relative' }}>
                    <label className="input-label">{domainTemplate === 'Room Core' ? 'Day' : 'Deadline'}</label>
                    {domainTemplate === 'Room Core' ? (
                      <select 
                        className="input-field" 
                        value={dueDate ? formatFormDate(dueDate, domainTemplate) : ''}
                        onChange={(e) => setDueDate(getNextDayOfWeek(e.target.value))}
                      >
                        <option value="">Select day...</option>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    ) : (
                      <>
                        <button 
                          type="button" 
                          className="input-field" 
                          style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} 
                          onClick={() => {
                            const el = document.getElementById('create-date-input');
                            if (el && 'showPicker' in el) (el as any).showPicker();
                          }}
                        >
                          <span style={{ color: dueDate ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                            {dueDate || 'Set date...'}
                          </span>
                          <Calendar size={16} style={{ color: 'var(--text-secondary)' }} />
                        </button>
                        <input 
                          id="create-date-input"
                          type="date" 
                          style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                          value={dueDate} 
                          onChange={(e) => setDueDate(e.target.value)} 
                        />
                      </>
                    )}
                  </div>
                  {domainTemplate !== 'Room Core' && (
                    <div className="input-group">
                      <label className="input-label">Description</label>
                      <textarea className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
                    </div>
                  )}
                  <div className="input-group">
                    <label className="input-label">Assign To</label>
                    <select className="input-field" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
                      <option value="">Auto-Assign (Smart Workload)</option>
                      {members.filter(m => m.status === 'ACCEPTED').map(m => (
                        <option key={m.userId} value={m.userId}>
                          {m.user.name} {m.role === 'ADMIN' ? '(Admin)' : ''} ({m.user.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={creating}>
                    {creating ? 'Creating...' : 'Create Task'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Welcome to {domainName}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                  You are a member of this workspace. Only the workspace Admin {allowsSubAdmin ? 'and Sub-Admin ' : ''}have the ability to create and manage tasks.
                  <br/><br/>
                  Please review your assigned tasks and mark them as <strong>Completed</strong> using the checkmark icon when you finish them!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
