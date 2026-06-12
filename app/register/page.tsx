'use client';

import { useState } from 'react';
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
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
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
        router.push('/dashboard');
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
        <h1 className={styles.title}>
          {step === 1 ? 'Create Account' : 'Verify Email'}
        </h1>
        <p className={styles.subtitle}>
          {step === 1 ? 'Start managing your domains today' : `We sent a code to ${email}`}
        </p>

        {error && <div className={styles.error}>{error}</div>}
        {message && <div style={{ color: '#10b981', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{message}</div>}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className={styles.form}>
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
            </div>

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

            <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
              {loading ? 'Sending Code...' : 'Next'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyAndRegister} className={styles.form}>
            <div className="input-group">
              <label className="input-label" htmlFor="otp">Verification Code</label>
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
            </div>

            <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Sign Up'}
            </button>
            
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              className={styles.link} 
              style={{ display: 'block', textAlign: 'center', marginTop: '1rem', background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}
            >
              Back to registration
            </button>
          </form>
        )}

        {step === 1 && (
          <div className={styles.footer}>
            Already have an account? 
            <Link href="/login" className={styles.link}>Sign in</Link>
          </div>
        )}
      </div>
    </div>
  );
}
