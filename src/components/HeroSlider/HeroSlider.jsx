import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeroSlider.module.css';

const slideImages = [
  '/images/herofirst.png',
  '/images/herosecond.png',
  '/images/herothird.jpg',
  '/images/herofourth.jpg',
  '/images/herofifth.jpg',
];

const textVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

export default function HeroSlider() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const slides = t('hero.slides', { returnObjects: true });

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slideImages.length);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + slideImages.length) % slideImages.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className={styles.slider}>

      {/* All slides rendered, only active one visible */}
      {slideImages.map((src, i) => (
        <div
          key={i}
          className={styles.slide}
          style={{ opacity: i === current ? 1 : 0, transition: 'opacity 0.7s ease' }}
        >
          <img
            src={src}
            alt={`Slide ${i + 1}`}
            className={styles.slideImg}
            style={i === 0 ? { objectFit: 'contain', background: '#000' } : {}}
          />
          <div className={styles.overlay} />
        </div>
      ))}

      {/* Animated text overlay */}
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className={styles.textBox}
          >
            <h1 className={styles.title}>{slides[current]?.title}</h1>
            <p className={styles.subtitle}>{slides[current]?.subtitle}</p>
            <div className={styles.ctaGroup}>
              <button
                className={styles.ctaPrimary}
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </button>
              <button
                className={styles.ctaSecondary}
                onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Gallery
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {slideImages.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
