import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: '📍',
      label: 'Address',
      value: t('contact.address'),
    },
    {
      icon: '📞',
      label: 'Phone',
      value: t('contact.phone'),
      href: `tel:${t('contact.phone')}`,
    },
    {
      icon: '✉️',
      label: 'Email',
      value: t('contact.email'),
      href: `mailto:${t('contact.email')}`,
    },
  ];

  return (
    <section id="contact" className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {/* Info + Map */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Info Cards */}
            <div className={styles.infoCards}>
              {contactInfo.map((info, i) => (
                <div key={i} className={styles.infoCard}>
                  <span className={styles.infoIcon}>{info.icon}</span>
                  <div>
                    <div className={styles.infoLabel}>{info.label}</div>
                    {info.href ? (
                      <a href={info.href} className={styles.infoValue}>{info.value}</a>
                    ) : (
                      <div className={styles.infoValue}>{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map Embed */}
            <div className={styles.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122972.5!2d79.5!3d14.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d5b6e0f000001%3A0x0!2sKothapalli%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: 'var(--radius)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UTF Location"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('contact.form.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder={t('contact.form.name')}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('contact.form.phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder={t('contact.form.phone')}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('contact.form.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder={t('contact.form.email')}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>{t('contact.form.message')}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder={t('contact.form.message')}
                  rows={5}
                  required
                />
              </div>

              {submitted && (
                <motion.div
                  className={styles.successMsg}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✅ {t('contact.form.success')}
                </motion.div>
              )}

              <button type="submit" className={styles.submitBtn}>
                {t('contact.form.submit')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
