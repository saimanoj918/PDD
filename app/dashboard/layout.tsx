'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, LogOut, Loader2, PlusCircle, Settings, Moon, Sun, Menu, Mail, Type, FileText, ArrowUp, BarChart, User } from 'lucide-react';
import { useLanguage } from '@/lib/i18nContext';
import { useFontSize } from '@/lib/FontSizeContext';
import styles from './layout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const { fontSize, setFontSize } = useFontSize();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [invitationsCount, setInvitationsCount] = useState(0);

  const { language, setLanguage, t } = useLanguage();
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
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
  }, []);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsMobileMenuOpen(false);
    setShowSettings(false);
  };

  const changeLanguage = (newLang: string) => {
    let langCode = 'en';
    if (newLang === 'Telugu') langCode = 'te';
    if (newLang === 'Hindi') langCode = 'hi';
    setLanguage(langCode);
    setIsMobileMenuOpen(false);
    setShowSettings(false);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsMobileMenuOpen(false);
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
          <button className={styles.mobileMenuBtn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} />
          </button>
          <h2>Core Scheduler</h2>
        </div>
        
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <Link 
            href="/dashboard" 
            className={`${styles.navItem} ${pathname === '/dashboard' ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LayoutDashboard size={20} />
            <span>{t('sidebar.dashboard')}</span>
          </Link>
          <Link 
            href="/dashboard/domains/new" 
            className={`${styles.navItem} ${pathname === '/dashboard/domains/new' ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <PlusCircle size={20} />
            <span>{t('sidebar.newDomain')}</span>
          </Link>
          
          <Link 
            href="/dashboard/domains/create" 
            className={`${styles.navItem} ${pathname === '/dashboard/domains/create' ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <PlusCircle size={20} />
            <span>Create Domain</span>
          </Link>

          <Link 
            href="/dashboard/invitations" 
            className={`${styles.navItem} ${pathname === '/dashboard/invitations' ? styles.active : ''}`}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onClick={() => setIsMobileMenuOpen(false)}
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
            href="/dashboard/progress" 
            className={`${styles.navItem} ${pathname === '/dashboard/progress' ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <BarChart size={20} />
            <span>{t('sidebar.progress')}</span>
          </Link>
          <Link 
            href="/dashboard/terms" 
            className={`${styles.navItem} ${pathname === '/dashboard/terms' ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FileText size={20} />
            <span>{t('sidebar.terms')}</span>
          </Link>
          <Link 
            href="/dashboard/profile" 
            className={`${styles.navItem} ${pathname === '/dashboard/profile' ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <User size={20} />
            <span>Profile</span>
          </Link>

        </nav>

        <div className={`${styles.sidebarFooter} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <div style={{ width: '100%', marginBottom: '1rem' }}>
            <button 
              onClick={() => setShowSettings(!showSettings)} 
              className={styles.navItem} 
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
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <Sun size={16} /> {t('sidebar.lightMode')}
                </button>
                <button 
                  onClick={() => toggleTheme('dark')} 
                  className={`${styles.navItem} ${theme === 'dark' ? styles.active : ''}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <Moon size={16} /> {t('sidebar.darkMode')}
                </button>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.5rem 1rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{t('sidebar.fontSize')}</div>
                <button 
                  onClick={() => { setFontSize('small'); setIsMobileMenuOpen(false); setShowSettings(false); }} 
                  className={`${styles.navItem} ${fontSize === 'small' ? styles.active : ''}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <Type size={14} /> {t('sidebar.fontSmall')}
                </button>
                <button 
                  onClick={() => { setFontSize('medium'); setIsMobileMenuOpen(false); setShowSettings(false); }} 
                  className={`${styles.navItem} ${fontSize === 'medium' ? styles.active : ''}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <Type size={16} /> {t('sidebar.fontMedium')}
                </button>
                <button 
                  onClick={() => { setFontSize('large'); setIsMobileMenuOpen(false); setShowSettings(false); }} 
                  className={`${styles.navItem} ${fontSize === 'large' ? styles.active : ''}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  <Type size={18} /> {t('sidebar.fontLarge')}
                </button>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.5rem 1rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{t('sidebar.language')}</div>
                <button 
                  onClick={() => changeLanguage('English')} 
                  className={`${styles.navItem} ${language === 'en' ? styles.active : ''}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  English
                </button>
                <button 
                  onClick={() => changeLanguage('Telugu')} 
                  className={`${styles.navItem} ${language === 'te' ? styles.active : ''}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  Telugu (తెలుగు)
                </button>
                <button 
                  onClick={() => changeLanguage('Hindi')} 
                  className={`${styles.navItem} ${language === 'hi' ? styles.active : ''}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
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
      
      <main className={styles.mainContent} ref={mainContentRef}>
        <div className={styles.topbar}>
          <h1 className={styles.pageTitle}>{t('sidebar.overview')}</h1>
          

        </div>
        <div className={styles.contentArea}>
          {children}
        </div>
        {showScrollTop && (
          <button onClick={scrollToTop} className={styles.scrollTopBtn} aria-label="Scroll to top">
            <ArrowUp size={24} />
          </button>
        )}
      </main>
    </div>
  );
}
