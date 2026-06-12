'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, KeyRound, Lock, ArrowLeft } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import styles from './page.module.css';

type AuthMode = 'login' | 'forgot_password' | 'reset_password';

export default function Login() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('registered') === 'true') {
        setSuccess('Account created successfully! Please sign in.');
        // Clean up the URL
        window.history.replaceState({}, document.title, '/login');
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Trigger global splash screen
        window.dispatchEvent(new Event('trigger-splash'));
        
        // Wait for splash animation before navigating
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 2500);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to login');
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMode('reset_password');
        if (data.devOtp) {
          setSuccess(`[TEST MODE] If an account exists, your verification code is: ${data.devOtp}`);
        } else {
          setSuccess('If an account exists, a 6-digit verification code has been sent to your email.');
        }
      } else {
        setError(data.error || 'Failed to process request');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (res.ok) {
        setMode('login');
        setPassword('');
        setSuccess('Password reset successfully! You can now log in.');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <AnimatedBackground />
      <div className={`${styles.authBox} glass-panel animate-fade-in`}>
        {mode === 'login' && (
          <>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Sign in to manage your domains</p>

            {success && <div style={{ color: 'var(--success)', backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{success}</div>}
            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleLogin} className={styles.form}>
              <div className="input-group">
                <label className="input-label" htmlFor="email">Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    id="email"
                    type="email"
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="input-label" htmlFor="password">Password</label>
                  <button type="button" onClick={() => { setMode('forgot_password'); setError(''); setSuccess(''); }} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Forgot password?</button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    id="password"
                    type="password"
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className={styles.footer}>
              Don't have an account? 
              <Link href="/register" className={styles.link}>Sign up</Link>
            </div>
          </>
        )}

        {mode === 'forgot_password' && (
          <>
            <button type="button" onClick={() => { setMode('login'); setSuccess(''); setError(''); }} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
              <ArrowLeft size={16} /> Back to login
            </button>
            <h1 className={styles.title}>Forgot Password</h1>
            <p className={styles.subtitle}>Enter your email to receive a secure verification code.</p>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleForgotPassword} className={styles.form}>
              <div className="input-group">
                <label className="input-label" htmlFor="reset-email">Registered Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    id="reset-email"
                    type="email"
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
                {loading ? 'Sending Code...' : 'Send Verification Code'}
              </button>
            </form>
          </>
        )}

        {mode === 'reset_password' && (
          <>
            <h1 className={styles.title}>Enter Verification Code</h1>
            <p className={styles.subtitle}>Check your email for the 6-digit code.</p>

            {success && <div style={{ color: 'var(--success)', backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{success}</div>}
            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleResetPassword} className={styles.form}>
              <div className="input-group">
                <label className="input-label" htmlFor="otp">6-Digit Code</label>
                <div style={{ position: 'relative' }}>
                  <KeyRound size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    id="otp"
                    type="text"
                    className="input-field"
                    style={{ paddingLeft: '2.5rem', letterSpacing: '0.5rem', fontSize: '1.25rem', fontWeight: 600, textAlign: 'center' }}
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="new-password">New Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    id="new-password"
                    type="password"
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>
              
              <button 
                type="button" 
                onClick={() => { setMode('login'); setSuccess(''); setError(''); setOtp(''); setNewPassword(''); }} 
                className={`btn-secondary ${styles.submitBtn}`} 
                style={{ marginTop: '0.5rem' }}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
