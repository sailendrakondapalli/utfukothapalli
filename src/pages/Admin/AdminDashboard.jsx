import { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { supabase, BUCKET } from '../../lib/supabase';
import styles from './Admin.module.css';

function Dashboard() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ done: 0, total: 0 });
  const [deleting, setDeleting] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  // ── READ: Fetch all photos ──
  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from(BUCKET).list('', {
        limit: 1000,
        sortBy: { column: 'created_at', order: 'desc' },
      });
      if (error) throw error;
      const items = (data || [])
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => {
          const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(f.name);
          return { name: f.name, url: urlData.publicUrl };
        });
      setPhotos(items);
    } catch (err) {
      showMsg('Error loading photos: ' + err.message, 'error');
    }
    setLoading(false);
  };

  useEffect(() => { fetchPhotos(); }, []);

  // ── CREATE: Upload photos ──
  const uploadFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadProgress({ done: 0, total: files.length });
    let success = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}_${i}.${ext}`;
      try {
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(fileName, file, { contentType: file.type, upsert: false });
        if (!error) success++;
      } catch (_) {}
      setUploadProgress({ done: i + 1, total: files.length });
    }

    showMsg(`✅ ${success} of ${files.length} photo(s) uploaded!`);
    setUploading(false);
    setUploadProgress({ done: 0, total: 0 });
    if (fileInputRef.current) fileInputRef.current.value = '';
    fetchPhotos();
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    uploadFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    uploadFiles(files);
  };

  // ── DELETE: Remove photo ──
  const handleDelete = async (name) => {
    if (!window.confirm(`Delete this photo? This cannot be undone.`)) return;
    setDeleting(name);
    try {
      const { error } = await supabase.storage.from(BUCKET).remove([name]);
      if (error) throw error;
      showMsg('🗑 Photo deleted.');
      setPhotos(prev => prev.filter(p => p.name !== name));
    } catch (err) {
      showMsg('Error deleting: ' + err.message, 'error');
    }
    setDeleting(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('utf_admin');
    navigate('/admin');
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.dashHeader}>
        <div className={styles.dashLogo}>
          <img src="/images/logo.png" alt="UTF" />
          <div>
            <h1>Admin Dashboard</h1>
            <p>UTF U. Kothapalli — Gallery Management</p>
          </div>
        </div>
        <div className={styles.dashActions}>
          <a href="/" target="_blank" rel="noreferrer" className={styles.viewSiteBtn}>🌐 View Site</a>
          <button onClick={handleLogout} className={styles.logoutBtn}>🚪 Logout</button>
        </div>
      </div>

      <div className={styles.dashBody}>
        {/* Message */}
        {message.text && (
          <div className={`${styles.msgBox} ${message.type === 'error' ? styles.msgError : ''}`}>
            {message.text}
          </div>
        )}

        {/* Upload */}
        <div className={styles.uploadSection}>
          <h2>📤 Add Photos</h2>
          <p>Click or drag & drop images to upload to the gallery.</p>
          <div
            className={`${styles.uploadBox} ${dragOver ? styles.dragActive : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInput}
              className={styles.fileInput}
              id="fileUpload"
              disabled={uploading}
            />
            <label htmlFor="fileUpload" className={styles.uploadLabel}>
              {uploading ? (
                <>
                  <span className={styles.uploadIcon}>⏳</span>
                  <span>Uploading {uploadProgress.done} / {uploadProgress.total}...</span>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${Math.round((uploadProgress.done / uploadProgress.total) * 100)}%` }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className={styles.uploadIcon}>📸</span>
                  <span className={styles.uploadMainText}>
                    {dragOver ? 'Drop photos here!' : 'Click or drag photos here'}
                  </span>
                  <span className={styles.uploadHint}>JPG, PNG, JPEG • Multiple files supported</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={styles.gallerySection}>
          <div className={styles.gallerySectionHeader}>
            <h2>🖼 Gallery Photos</h2>
            <span className={styles.photoCount}>{photos.length} photos</span>
            <button onClick={fetchPhotos} className={styles.refreshBtn}>🔄 Refresh</button>
          </div>

          {loading ? (
            <div className={styles.loadingSpinner}>⏳ Loading photos...</div>
          ) : photos.length === 0 ? (
            <div className={styles.emptyMsg}>No photos yet. Upload some above.</div>
          ) : (
            <div className={styles.photoGrid}>
              {photos.map((photo) => (
                <div key={photo.name} className={styles.photoCard}>
                  <div className={styles.photoImgWrap}>
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className={styles.photoThumb}
                      loading="lazy"
                    />
                    <div className={styles.photoOverlay}>
                      <button
                        className={styles.deleteBtnOverlay}
                        onClick={() => handleDelete(photo.name)}
                        disabled={deleting === photo.name}
                      >
                        {deleting === photo.name ? '⏳ Deleting...' : '🗑 Delete'}
                      </button>
                    </div>
                  </div>
                  <div className={styles.photoInfo}>
                    <span className={styles.photoName} title={photo.name}>
                      {photo.name.replace(/^\d+_\d+\./, '').replace(/^\d+_/, '')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  if (!sessionStorage.getItem('utf_admin')) return <Navigate to="/admin" replace />;
  return <Dashboard />;
}
