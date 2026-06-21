'use client';

import { useEffect, useState } from 'react';
import { Layers } from 'lucide-react';
import styles from './GlobalSplash.module.css';

export default function GlobalSplash() {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Keep it hidden for static gh-pages view, since there is no session redirect delay
    setShow(false);
  }, []);

  return (
    <div key={key} className={`${styles.splashOverlay} ${!show ? styles.splashHidden : ''}`}>
      {/* Background Orbs */}
      <div className={styles.orbOne}></div>
      <div className={styles.orbTwo}></div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.iconContainer}>
          <svg className={styles.progressRing} viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="56" className={styles.progressCircle}></circle>
          </svg>
          <Layers size={50} className={styles.icon} />
        </div>
        <h1 className={styles.title}>Multi-Domain Scheduler</h1>
      </div>
    </div>
  );
}
