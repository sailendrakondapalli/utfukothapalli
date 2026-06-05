import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import styles from './Statistics.module.css';

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const stats = [
    { value: 500, suffix: '+', label: t('stats.teachers'), icon: '👨‍🏫' },
    { value: 100, suffix: '+', label: t('stats.programs'), icon: '📋' },
    { value: 50, suffix: '+', label: t('stats.meetings'), icon: '🤝' },
    { value: 10, suffix: '+', label: t('stats.years'), icon: '⭐' },
  ];

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.bgDecor} />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ color: 'white' }}>{t('stats.title')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>{t('stats.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className={styles.icon}>{stat.icon}</span>
              <div className={styles.number}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className={styles.label}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
