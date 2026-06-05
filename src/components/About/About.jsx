import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const objectives = t('about.objectives.items', { returnObjects: true });
  const achievements = t('about.achievements.items', { returnObjects: true });

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Image Column */}
          <motion.div className={styles.imageCol} variants={fadeUp}>
            <div className={styles.imageWrapper}>
              <img
                src="/images/about.jpg"
                alt="UTF Meeting"
                className={styles.mainImg}
              />
              <div className={styles.imageBadge}>
                <span className={styles.badgeNum}>50+</span>
                <span className={styles.badgeText}>Years of Service</span>
              </div>
              <div className={styles.imageAccent} />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div className={styles.contentCol} variants={stagger}>
            <motion.div className={styles.sectionTag} variants={fadeUp}>
              About Us
            </motion.div>
            <motion.h2 className={styles.title} variants={fadeUp}>
              {t('about.title')}
            </motion.h2>
            <motion.p className={styles.description} variants={fadeUp}>
              {t('about.description')}
            </motion.p>

            {/* History */}
            <motion.div className={styles.card} variants={fadeUp}>
              <div className={styles.cardIcon}>📚</div>
              <div>
                <h3>{t('about.history.title')}</h3>
                <p>{t('about.history.text')}</p>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div className={styles.tabs} variants={fadeUp}>
              <div className={styles.tabPanel}>
                <h4 className={styles.tabTitle}>🎯 {t('about.objectives.title')}</h4>
                <ul className={styles.list}>
                  {objectives.map((item, i) => (
                    <li key={i} className={styles.listItem}>
                      <span className={styles.dot}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.tabPanel}>
                <h4 className={styles.tabTitle}>🏆 {t('about.achievements.title')}</h4>
                <ul className={styles.list}>
                  {achievements.map((item, i) => (
                    <li key={i} className={styles.listItem}>
                      <span className={styles.dotGold}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
