'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, LogOut, Loader2, PlusCircle, Settings, Moon, Sun, Menu, Mail, Type, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/i18nContext';
import styles from './layout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('16px');
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [invitationsCount, setInvitationsCount] = useState(0);
  const { language, setLanguage, t } = useLanguage();
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          
          // Fetch invitations count
          fetch('/api/invitations')
            .then(r => r.json())
            .then(data => {
              if (data.invitations) {
                setInvitationsCount(data.invitations.length);
              }
            }).catch(console.error);
            
        } else {
          router.push('/login');
        }
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    const savedFontSize = localStorage.getItem('fontSize') || '16px';
    setFontSize(savedFontSize);
    document.documentElement.style.setProperty('--base-font-size', savedFontSize);
  }, []);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const changeFontSize = (size: string) => {
    let px = '16px';
    if (size === 'small') px = '14px';
    if (size === 'medium') px = '16px';
    if (size === 'large') px = '18px';
    
    setFontSize(px);
    localStorage.setItem('fontSize', px);
    document.documentElement.style.setProperty('--base-font-size', px);
  };

  const changeLanguage = (newLang: string) => {
    let langCode = 'en';
    if (newLang === 'Telugu') langCode = 'te';
    if (newLang === 'Hindi') langCode = 'hi';
    setLanguage(langCode);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} size={48} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={styles.layout}>
      <aside className={`${styles.sidebar} glass-panel`}>
        <div className={styles.sidebarHeader}>
          <h2>Core Scheduler</h2>
          <button className={styles.mobileMenuBtn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
        
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <Link 
            href="/dashboard" 
            className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>{t('sidebar.dashboard')}</span>
          </Link>
          <Link 
            href="/dashboard/domains/new" 
            className={`${styles.navItem} ${pathname === '/dashboard/domains/new' ? styles.active : ''}`}
          >
            <PlusCircle size={20} />
            <span>{t('sidebar.newDomain')}</span>
          </Link>
          <Link 
            href="/dashboard/invitations" 
            className={`${styles.navItem} ${pathname === '/dashboard/invitations' ? styles.active : ''}`}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={20} />
              <span>{t('sidebar.invitations')}</span>
            </div>
            {invitationsCount > 0 && (
              <span style={{ 
                background: 'var(--accent-primary)', 
                color: 'white', 
                fontSize: '0.7rem', 
                padding: '2px 6px', 
                borderRadius: '10px',
                fontWeight: 'bold'
              }}>
                {invitationsCount}
              </span>
            )}
          </Link>
          <Link 
            href="/dashboard/terms" 
            className={`${styles.navItem} ${pathname === '/dashboard/terms' ? styles.active : ''}`}
          >
            <FileText size={20} />
            <span>{t('sidebar.terms')}</span>
          </Link>

        </nav>

        <div className={`${styles.sidebarFooter} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <div style={{ width: '100%', marginBottom: '1rem' }}>
            <button 
              onClick={() => setShowSettings(!showSettings)} 
              className={styles.navItem} 
              style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <Settings size={20} />
              <span>{t('sidebar.settings')}</span>
            </button>
            
            {showSettings && (
              <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.5rem 1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{t('sidebar.theme')}</div>
                <button 
                  onClick={() => toggleTheme('light')} 
                  className={`${styles.navItem} ${theme === 'light' ? styles.active : ''}`}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <Sun size={16} /> {t('sidebar.lightMode')}
                </button>
                <button 
                  onClick={() => toggleTheme('dark')} 
                  className={`${styles.navItem} ${theme === 'dark' ? styles.active : ''}`}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <Moon size={16} /> {t('sidebar.darkMode')}
                </button>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.5rem 1rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{t('sidebar.fontSize')}</div>
                <button 
                  onClick={() => changeFontSize('small')} 
                  className={`${styles.navItem} ${fontSize === '14px' ? styles.active : ''}`}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <Type size={14} /> {t('sidebar.fontSmall')}
                </button>
                <button 
                  onClick={() => changeFontSize('medium')} 
                  className={`${styles.navItem} ${fontSize === '16px' ? styles.active : ''}`}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <Type size={16} /> {t('sidebar.fontMedium')}
                </button>
                <button 
                  onClick={() => changeFontSize('large')} 
                  className={`${styles.navItem} ${fontSize === '18px' ? styles.active : ''}`}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <Type size={18} /> {t('sidebar.fontLarge')}
                </button>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.5rem 1rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{t('sidebar.language')}</div>
                <button 
                  onClick={() => changeLanguage('English')} 
                  className={`${styles.navItem} ${language === 'en' ? styles.active : ''}`}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  English
                </button>
                <button 
                  onClick={() => changeLanguage('Telugu')} 
                  className={`${styles.navItem} ${language === 'te' ? styles.active : ''}`}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  Telugu (తెలుగు)
                </button>
                <button 
                  onClick={() => changeLanguage('Hindi')} 
                  className={`${styles.navItem} ${language === 'hi' ? styles.active : ''}`}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  Hindi (हिंदी)
                </button>
              </div>
            )}
          </div>

          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userEmail}>{user.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} />
            <span>{t('sidebar.logout')}</span>
          </button>
        </div>
      </aside>
      
      <main className={styles.mainContent}>
        <div className={styles.topbar}>
          <h1 className={styles.pageTitle}>{t('sidebar.overview')}</h1>
          

        </div>
        <div className={styles.contentArea}>
          {children}
        </div>
      </main>
    </div>
  );
}
