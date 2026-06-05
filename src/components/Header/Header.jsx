import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLang = (lang) => i18n.changeLanguage(lang);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { href: '#home',       label: t('nav.home') },
    { href: '#about',      label: t('nav.about') },
    { href: '#gallery',    label: t('nav.gallery') },
    { href: '#meetings',   label: t('nav.meetings') },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>

      {/* ── TOP BAND: Logo | Title | Photo ── */}
      <div className={styles.topBand}>
        <div className={styles.topInner}>

          {/* Left: UTF logo image */}
          <div className={styles.utfLogo}>
            <img
              src="/images/logo.png"
              alt="UTF Logo"
              className={styles.logoImg}
            />
          </div>

          {/* Centre: org name */}
          <div className={styles.orgName}>
            <p className={styles.orgTagline}>
              <span>{i18n.language === 'te' ? 'అధ్యయనం' : 'Learning'}</span>
              <span>{i18n.language === 'te' ? 'అధ్యాపనం' : 'Teaching'}</span>
              <span>{i18n.language === 'te' ? 'సామాజిక స్పృహ' : 'Social Awareness'}</span>
            </p>
            <h1 className={styles.orgTitle}>
              {i18n.language === 'te'
                ? 'UTF యు. కొత్తపల్లి'
                : 'UTF U. KOTHAPALLI'}
            </h1>
            <h2 className={styles.orgSubTitle}>
              {i18n.language === 'te'
                ? 'యూనైటెడ్ టీచర్స్ ఫెడరేషన్ — యు. కొత్తపల్లి'
                : 'United Teachers Federation — U. Kothapalli'}
            </h2>
          </div>

          {/* Right: leader photo + lang switch */}
          <div className={styles.rightSide}>
            <div className={styles.leaderPhoto}>
              <img
                src="/images/founder.png"
                alt="Founder"
              />
            </div>
            {/* Language switch */}
            <div className={styles.langSwitch}>
              <button
                className={`${styles.langBtn} ${i18n.language === 'en' ? styles.langActive : ''}`}
                onClick={() => switchLang('en')}
              >
                EN
              </button>
              <span className={styles.langDivider}>|</span>
              <button
                className={`${styles.langBtn} ${i18n.language === 'te' ? styles.langActive : ''}`}
                onClick={() => switchLang('te')}
              >
                తె
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── NAV BAR ── */}
      <nav className={styles.navBar}>
        <div className={styles.navInner}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${i === 0 ? styles.navActive : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            >
              {link.label}
            </a>
          ))}

          {/* Hamburger trigger (mobile only) */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              >
                {link.label}
              </a>
            ))}
            <div className={styles.mobileLangRow}>
              <button
                className={`${styles.langBtn} ${i18n.language === 'en' ? styles.langActive : ''}`}
                onClick={() => { switchLang('en'); setMenuOpen(false); }}
              >English</button>
              <span className={styles.langDivider}>|</span>
              <button
                className={`${styles.langBtn} ${i18n.language === 'te' ? styles.langActive : ''}`}
                onClick={() => { switchLang('te'); setMenuOpen(false); }}
              >తెలుగు</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
