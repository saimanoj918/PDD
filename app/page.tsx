'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Users, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

const slides = [
  {
    id: 1,
    title: 'Organize Your Life',
    description: 'Create dedicated workspaces and domains for every aspect of your life or project.',
    icon: Layers
  },
  {
    id: 2,
    title: 'Collaborate Seamlessly',
    description: 'Invite members, assign tasks, and track real-time progress together as a team.',
    icon: Users
  },
  {
    id: 3,
    title: 'Track Your Progress',
    description: 'Beautiful visual dashboards help you stay on top of your goals and deadlines.',
    icon: BarChart3
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has already seen onboarding or is logged in
    const hasSeen = document.cookie.includes('hasSeenOnboardingV2=true');
    const hasToken = document.cookie.includes('token=');
    if (hasSeen || hasToken) {
      router.replace(hasToken ? '/dashboard' : '/login');
    } else {
      setMounted(true);
    }
  }, [router]);

  const finishOnboarding = () => {
    // Set cookie to not show again for 1 year
    document.cookie = "hasSeenOnboardingV2=true; max-age=31536000; path=/";
    router.push('/login');
  };

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      finishOnboarding();
    } else {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  if (!mounted) return null;

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className={styles.container}>

      <button onClick={finishOnboarding} className={styles.skipButtonTopRight}>
        Skip
      </button>

      <div className={styles.slidesContainer}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            className={styles.slide}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className={styles.iconContainer}
            >
              <CurrentIcon size={48} className={styles.icon} />
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className={styles.title}
            >
              {slides[currentSlide].title}
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className={styles.description}
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <div className={styles.indicators}>
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
            />
          ))}
        </div>

        <button onClick={nextSlide} className={styles.nextButton}>
          {currentSlide === slides.length - 1 ? (
            <>
              Get Started <CheckCircle2 size={20} />
            </>
          ) : (
            <>
              Next <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
