'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Check, X, Loader2 } from 'lucide-react';
import styles from './page.module.css';

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      const res = await fetch('/api/invitations');
      if (res.ok) {
        const data = await res.json();
        setInvitations(data.invitations);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (domainId: string, action: 'accept' | 'reject', isRoleUpgrade: boolean = false) => {
    setActionLoading(domainId);
    try {
      const endpoint = isRoleUpgrade 
        ? `/api/invitations/${domainId}/role` 
        : `/api/invitations/${domainId}`;

      const res = await fetch(endpoint, {
        method: action === 'accept' ? 'POST' : 'DELETE'
      });
      
      if (res.ok) {
        setInvitations(invitations.filter(inv => {
          if (isRoleUpgrade) return inv.domainId !== domainId || inv.pendingRole === null;
          return inv.domainId !== domainId;
        }));
        if (action === 'accept' && !isRoleUpgrade) {
          // Force a full refresh so the sidebar updates to show the new domain
          window.location.href = `/dashboard/domains/${domainId}`;
        } else {
          // Force reload to update the sidebar badge notification
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <div className={styles.emptyState}><Loader2 className="spin" /></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Pending Messages</h2>
        <p>You have received messages to join the following domains.</p>
      </div>

      {invitations.length === 0 ? (
        <div className={`${styles.emptyState} glass-panel`}>
          <MessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No Pending Messages</h3>
          <p>You're all caught up!</p>
        </div>
      ) : (
        <div className="invitations-list">
          {invitations.map((inv) => {
            const isRoleUpgrade = inv.status === 'ACCEPTED' && inv.pendingRole !== null;
            const adminName = inv.domain?.members?.[0]?.user?.name || 'an Admin';
            
            return (
              <div key={`${inv.id}-${isRoleUpgrade ? 'role' : 'domain'}`} className={`${styles.invitationCard} glass-panel`}>
                <div className={styles.domainInfo}>
                  <h3>{inv.domain.name}</h3>
                  <p>{inv.domain.description || 'No description provided'}</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Invited by: <strong>{adminName}</strong>
                  </p>
                  <p style={{ marginTop: '0.2rem', fontSize: '0.8rem', color: 'var(--accent-primary)' }}>
                    {isRoleUpgrade 
                      ? <>Role Upgrade: <strong>{inv.pendingRole}</strong></> 
                      : <>Invited as: <strong>{inv.role}</strong></>
                    }
                  </p>
                </div>
                <div className={styles.actions}>
                  <button 
                    className={styles.rejectBtn}
                    onClick={() => handleAction(inv.domainId, 'reject', isRoleUpgrade)}
                    disabled={actionLoading === inv.domainId}
                  >
                    <X size={18} /> Reject
                  </button>
                  <button 
                    className={styles.acceptBtn}
                    onClick={() => handleAction(inv.domainId, 'accept', isRoleUpgrade)}
                    disabled={actionLoading === inv.domainId}
                  >
                    <Check size={18} /> Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
