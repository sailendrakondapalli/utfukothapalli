import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import styles from './Gallery.module.css';

const galleryItems = [
  { id: 1,  src: '/images/galery1.jpg',   h: 'tall'  },
  { id: 2,  src: '/images/galery2.jpg',   h: 'short' },
  { id: 3,  src: '/images/galery3.jpg',   h: 'short' },
  { id: 4,  src: '/images/galery4.jpeg',  h: 'tall'  },
  { id: 5,  src: '/images/galery5.jpeg',  h: 'short' },
  { id: 6,  src: '/images/galery6.jpeg',  h: 'tall'  },
  { id: 7,  src: '/images/galery7.jpeg',  h: 'short' },
  { id: 8,  src: '/images/galery8.jpg',   h: 'short' },
  { id: 9,  src: '/images/galery9.jpeg',  h: 'tall'  },
  { id: 10, src: '/images/galery10.jpeg', h: 'short' },
  { id: 11, src: '/images/galery11.jpeg', h: 'tall'  },
  { id: 12, src: '/images/galery12.jpeg', h: 'short' },
];

function ZoomableImage({ src, alt }) {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const lastDist = useRef(null);
  const lastTouch = useRef(null);
  const imgRef = useRef(null);

  // ── Pinch to zoom ──
  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastDist.current = Math.hypot(dx, dy);
    } else if (e.touches.length === 1 && scale > 1) {
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      if (lastDist.current) {
        const delta = dist / lastDist.current;
        setScale(prev => Math.min(Math.max(prev * delta, 1), 4));
      }
      lastDist.current = dist;
    } else if (e.touches.length === 1 && scale > 1 && lastTouch.current) {
      e.preventDefault();
      const dx = e.touches[0].clientX - lastTouch.current.x;
      const dy = e.touches[0].clientY - lastTouch.current.y;
      setTranslate(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const onTouchEnd = (e) => {
    if (e.touches.length < 2) lastDist.current = null;
    if (e.touches.length < 1) lastTouch.current = null;
    // snap back if scale is near 1
    if (scale < 1.05) {
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    }
  };

  // Double-tap to reset
  const lastTap = useRef(0);
  const onDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (scale > 1) {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
      } else {
        setScale(2.5);
      }
    }
    lastTap.current = now;
  };

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={styles.lightboxImg}
      style={{
        transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
        transition: scale === 1 ? 'transform 0.3s ease' : 'none',
        cursor: scale > 1 ? 'grab' : 'zoom-in',
        touchAction: 'none',
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={onDoubleTap}
    />
  );
}

export default function Gallery() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (item, i) => {
    setLightbox(item);
    setLightboxIndex(i);
  };

  const lightboxPrev = (e) => {
    e.stopPropagation();
    const i = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    setLightbox(galleryItems[i]);
    setLightboxIndex(i);
  };

  const lightboxNext = (e) => {
    e.stopPropagation();
    const i = (lightboxIndex + 1) % galleryItems.length;
    setLightbox(galleryItems[i]);
    setLightboxIndex(i);
  };

  return (
    <section id="gallery" className={styles.section} ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('gallery.title')}</h2>
          <p>{t('gallery.subtitle')}</p>
        </motion.div>

        {/* ── Desktop: Masonry Grid ── */}
        <div className={styles.masonry}>
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`${styles.masonryItem} ${item.h === 'tall' ? styles.tall : styles.short}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onClick={() => openLightbox(item, i)}
            >
              <img src={item.src} alt={`Gallery ${item.id}`} className={styles.galleryImg} />
              <div className={styles.imgOverlay}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="28" height="28">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile: Horizontal scroll strip ── */}
        <div className={styles.mobileScroll}>
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className={styles.mobileCard}
              onClick={() => openLightbox(item, i)}
            >
              <img src={item.src} alt={`Gallery ${item.id}`} className={styles.mobileImg} />
              <div className={styles.mobileOverlay}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" width="22" height="22">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox with prev/next */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
          <motion.div
            className={styles.lightboxImgWrap}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ZoomableImage key={lightbox.src} src={lightbox.src} alt="" />
          </motion.div>
            <button className={styles.closeBtn} onClick={() => setLightbox(null)}>✕</button>
            <button className={`${styles.lbArrow} ${styles.lbLeft}`} onClick={lightboxPrev}>‹</button>
            <button className={`${styles.lbArrow} ${styles.lbRight}`} onClick={lightboxNext}>›</button>
            <div className={styles.lbCounter}>{lightboxIndex + 1} / {galleryItems.length}</div>
            <div className={styles.zoomHint}>Pinch to zoom · Double-tap to reset</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
