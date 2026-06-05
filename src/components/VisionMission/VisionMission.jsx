import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './VisionMission.module.css';

const icons = ['🛡️', '📈', '🎓', '👩‍🎓', '🤝'];

export default function VisionMission() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const missionItems = t('vision.missionItems', { returnObjects: true });

  return (
    <section id="vision" className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('vision.sectionTitle')}</h2>
        </motion.div>

        <div className={styles.grid}>
          {/* Vision Card */}
          <motion.div
            className={styles.visionCard}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.cardGlow} />
            <div className={styles.iconWrap}>
              <span className={styles.bigIcon}>🌟</span>
            </div>
            <h3 className={styles.cardTitle}>{t('vision.visionTitle')}</h3>
            <p className={styles.visionText}>{t('vision.visionText')}</p>
            <div className={styles.visionDecor}>
              <div /><div /><div />
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className={styles.missionCard}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.iconWrap}>
              <span className={styles.bigIcon}>🎯</span>
            </div>
            <h3 className={styles.cardTitleDark}>{t('vision.missionTitle')}</h3>
            <ul className={styles.missionList}>
              {missionItems.map((item, i) => (
                <motion.li
                  key={i}
                  className={styles.missionItem}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className={styles.missionIcon}>{icons[i]}</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
