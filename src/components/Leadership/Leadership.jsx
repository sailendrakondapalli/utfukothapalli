import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './Leadership.module.css';

const memberPhotos = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
];

export default function Leadership() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const members = t('leadership.members', { returnObjects: true });

  return (
    <section id="leadership" className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('leadership.title')}</h2>
          <p>{t('leadership.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {members.map((member, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={styles.photoWrap}>
                <img
                  src={memberPhotos[i % memberPhotos.length]}
                  alt={member.name}
                  className={styles.photo}
                />
                <div className={styles.photoOverlay} />
              </div>
              <div className={styles.info}>
                <span className={styles.designation}>{member.designation}</span>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.desc}>{member.description}</p>
              </div>
              <div className={styles.socialRow}>
                <a href="#" className={styles.socialBtn} aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialBtn} aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialBtn} aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
