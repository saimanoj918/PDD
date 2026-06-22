'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnimatedBackground from '../components/AnimatedBackground';
import styles from '../login/page.module.css'; // Reusing login styles

export default function Register() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' }).catch(() => null);
        if (res && res.ok) {
          router.replace('/dashboard');
        } else {
          setMounted(true);
        }
      } catch (err) {
        setMounted(true);
      }
    }
    checkAuth();
  }, [router]);

  if (!mounted) return null;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/send-signup-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.devOtp) {
          setMessage(`[TEST MODE] Your verification code is: ${data.devOtp}`);
        } else {
          setMessage('A verification code has been sent to your email.');
        }
        setStep(2);
        setResendTimer(30);
      } else {
        setError(data.error || 'Failed to send verification code');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        setMessage('Email verified successfully! You can now choose a password.');
        setStep(3);
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid verification code');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, otp }),
      });

      if (res.ok) {
        router.push('/login?registered=true');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to register');
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
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Start managing your domains today</p>

        {error && <div className={styles.error}>{error}</div>}
        {message && <div style={{ color: '#10b981', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{message}</div>}

        <form onSubmit={(e) => {
          e.preventDefault();
          if (step === 1) handleSendOtp(e);
          else if (step === 2) handleVerifyOtp(e);
          else handleRegister(e);
        }} className={styles.form}>
          <div className="input-group">
            <label className="input-label" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={step > 1}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={step > 1}
              required
            />
            {step === 1 && (
              <button 
                type="submit" 
                className={`btn-secondary ${styles.submitBtn}`} 
                style={{ marginTop: '0.5rem', padding: '0.5rem' }}
                disabled={loading || !email}
              >
                {loading ? 'Sending...' : 'Verify Email'}
              </button>
            )}
          </div>

          {step >= 2 && (
            <div className="input-group animate-fade-in" style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <label className="input-label" htmlFor="otp" style={{ color: 'var(--success)' }}>
                {step === 3 ? 'Email Verified ✓' : 'Verification Code'}
              </label>
              {step === 2 ? (
                <>
                  <input
                    id="otp"
                    type="text"
                    className="input-field"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                    style={{ textAlign: 'center', letterSpacing: '0.25rem', fontSize: '1.25rem', fontWeight: 'bold' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', alignItems: 'center' }}>
                    <button 
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className={`btn-primary ${styles.submitBtn}`}
                      style={{ width: '48%', margin: 0, padding: '0.5rem' }}
                    >
                      {loading ? 'Verifying...' : 'Verify Code'}
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={() => handleSendOtp()} 
                      disabled={resendTimer > 0 || loading}
                      className={styles.link} 
                      style={{ width: '48%', background: 'none', border: 'none', cursor: resendTimer > 0 ? 'not-allowed' : 'pointer', fontSize: '0.9rem', opacity: resendTimer > 0 ? 0.5 : 1, textAlign: 'right' }}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--success)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {otp}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="input-group animate-fade-in">
              <label className="input-label" htmlFor="password">Choose Password</label>
              <input
                id="password"
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <button 
                type="submit" 
                className={`btn-primary ${styles.submitBtn}`} 
                disabled={loading}
                style={{ marginTop: '1rem' }}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          )}
        </form>

        <div className={styles.footer}>
          Already have an account? 
          <Link href="/login" className={styles.link}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
