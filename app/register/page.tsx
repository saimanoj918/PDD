'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AnimatedBackground from '../components/AnimatedBackground';
import styles from '../login/page.module.css'; // Reusing login styles

export default function Register() {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

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
        setResendTimer(30); // 30 second cooldown
      } else {
        setError(data.error || 'Failed to send verification code');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
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
        // Redirect to login after successful signup
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

        <form onSubmit={handleVerifyAndRegister} className={styles.form}>
          <div className="input-group">
            <label className="input-label" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              required
            />
            {step === 1 && (
              <button 
                type="button" 
                onClick={handleSendOtp} 
                className={`btn-secondary ${styles.submitBtn}`} 
                style={{ marginTop: '0.5rem', padding: '0.5rem' }}
                disabled={loading || !email}
              >
                {loading ? 'Sending...' : 'Verify Email'}
              </button>
            )}
          </div>

          {step === 2 && (
            <div className="input-group animate-fade-in" style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <label className="input-label" htmlFor="otp" style={{ color: 'var(--success)' }}>Verification Code</label>
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => handleSendOtp()} 
                  disabled={resendTimer > 0 || loading}
                  className={styles.link} 
                  style={{ background: 'none', border: 'none', cursor: resendTimer > 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem', opacity: resendTimer > 0 ? 0.5 : 1 }}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                </button>
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`btn-primary ${styles.submitBtn}`} 
            disabled={loading || step === 1}
            style={{ opacity: step === 1 ? 0.5 : 1 }}
          >
            {step === 1 ? 'Verify Email to Continue' : (loading ? 'Creating Account...' : 'Verify & Sign Up')}
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account? 
          <Link href="/login" className={styles.link}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
