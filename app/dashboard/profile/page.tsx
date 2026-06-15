'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, KeyRound, AlertTriangle, User, Mail, Loader2 } from 'lucide-react';
import styles from '../profile.module.css';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMessage, setPwdMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

  // Account Deletion State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState<1 | 2>(1); // 1 = Request OTP, 2 = Enter OTP
  const [deleteOtp, setDeleteOtp] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMessage(null);

    if (newPassword !== confirmPassword) {
      setPwdMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 6) {
      setPwdMessage({ type: 'error', text: 'New password must be at least 6 characters' });
      return;
    }

    setPwdLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setPwdMessage({ type: 'success', text: 'Password updated successfully!' });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPwdMessage({ type: 'error', text: data.error || 'Failed to update password' });
      }
    } catch (err: any) {
      setPwdMessage({ type: 'error', text: err.message || 'An unexpected error occurred' });
    } finally {
      setPwdLoading(false);
    }
  };

  const handleRequestDeleteOTP = async () => {
    setDeleteError('');
    setDeleteLoading(true);
    
    try {
      const res = await fetch('/api/auth/delete-account/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email }),
      });

      const data = await res.json();
      if (res.ok) {
        setDeleteStep(2);
      } else {
        setDeleteError(data.error || 'Failed to send verification code');
      }
    } catch (err: any) {
      setDeleteError(err.message || 'An unexpected error occurred');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleVerifyAndDelete = async () => {
    if (deleteOtp.length !== 6) {
      setDeleteError('Please enter a valid 6-digit code');
      return;
    }

    setDeleteError('');
    setDeleteLoading(true);

    try {
      const res = await fetch('/api/auth/delete-account/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: deleteOtp }),
      });

      const data = await res.json();
      if (res.ok) {
        // Account deleted successfully, redirect to login
        router.push('/login');
      } else {
        setDeleteError(data.error || 'Failed to delete account');
      }
    } catch (err: any) {
      setDeleteError(err.message || 'An unexpected error occurred');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader2 className="spinner" size={32} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={`${styles.container} animate-fade-in`}>
      <h1 className={styles.title}>Your Profile</h1>

      {/* Profile Details */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}><User size={20} /> Personal Information</h2>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Name:</div>
          <div className={styles.infoValue}>{user.name}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Email:</div>
          <div className={styles.infoValue}>{user.email}</div>
        </div>
      </div>

      {/* Change Password */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}><KeyRound size={20} /> Change Password</h2>
        
        {pwdMessage && (
          <div className={`${styles.message} ${styles[pwdMessage.type]}`}>
            {pwdMessage.text}
          </div>
        )}

        <form onSubmit={handleChangePassword} className={styles.form}>
          <div className="input-group">
            <label className="input-label" htmlFor="oldPassword">Current Password</label>
            <input
              id="oldPassword"
              type="password"
              className="input-field"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              className="input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={pwdLoading}>
            {pwdLoading ? <Loader2 size={18} className="spinner" /> : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className={`${styles.section} ${styles.dangerBorder}`}>
        <h2 className={`${styles.sectionTitle} ${styles.dangerTitle}`}><AlertTriangle size={20} /> Danger Zone</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          Deleting your account is permanent. This will delete all your personal data, domains you own, and tasks you created.
          If you were assigned to tasks by others, your name will be removed from those tasks.
        </p>
        <button 
          onClick={() => setShowDeleteModal(true)} 
          className={styles.dangerBtn}
        >
          <Shield size={18} /> Delete Account
        </button>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Delete Account</h3>
            
            {deleteStep === 1 ? (
              <>
                <p className={styles.modalDesc}>
                  Are you absolutely sure you want to delete your account? This action <strong>cannot be undone</strong>. 
                  All domains where you are an admin will be permanently deleted.
                </p>
                {deleteError && <div className={`${styles.message} ${styles.error}`}>{deleteError}</div>}
                
                <div className={styles.modalActions}>
                  <button onClick={() => setShowDeleteModal(false)} className={styles.cancelBtn} disabled={deleteLoading}>
                    Cancel
                  </button>
                  <button onClick={handleRequestDeleteOTP} className={styles.dangerBtn} disabled={deleteLoading} style={{ background: '#ef4444', color: 'white' }}>
                    {deleteLoading ? <Loader2 size={18} className="spinner" /> : 'Send Verification Code'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className={styles.modalDesc}>
                  We sent a 6-digit verification code to <strong>{user.email}</strong>. Enter it below to permanently delete your account.
                </p>
                {deleteError && <div className={`${styles.message} ${styles.error}`}>{deleteError}</div>}
                
                <div className="input-group">
                  <div style={{ position: 'relative' }}>
                    <KeyRound size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      className="input-field"
                      style={{ paddingLeft: '2.5rem', letterSpacing: '0.5rem', fontSize: '1.25rem', fontWeight: 600, textAlign: 'center' }}
                      maxLength={6}
                      value={deleteOtp}
                      onChange={(e) => setDeleteOtp(e.target.value)}
                      placeholder="000000"
                    />
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button onClick={() => { setShowDeleteModal(false); setDeleteStep(1); setDeleteOtp(''); }} className={styles.cancelBtn} disabled={deleteLoading}>
                    Cancel
                  </button>
                  <button onClick={handleVerifyAndDelete} className={styles.dangerBtn} disabled={deleteLoading} style={{ background: '#ef4444', color: 'white' }}>
                    {deleteLoading ? <Loader2 size={18} className="spinner" /> : 'Confirm Deletion'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
