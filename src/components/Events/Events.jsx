import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Events.module.css';

const eventImages = [
  '/images/newcounslingmeeting.png',
  '/images/ranaberi.jpg',
  '/images/ranaberi1.jpg',
];

export default function Events() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const events = t('meetings.events', { returnObjects: true });

  return (
    <section id="meetings" className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('meetings.title')}</h2>
          <p>{t('meetings.subtitle')}</p>
        </motion.div>

        <div className={styles.timeline}>
          {events.map((event, i) => (
            <motion.div
              key={i}
              className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              {/* Dot */}
              <div className={styles.dot}>
                <span>{i + 1}</span>
              </div>

              <div className={styles.card}>
                <div className={styles.imgWrap}>
                  <img src={eventImages[i]} alt={event.title} className={styles.img} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{event.title}</h3>
                  <p className={styles.desc}>{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className={styles.line} />
        </div>
      </div>
    </section>
  );
}
