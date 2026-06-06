import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

const ADMIN_ID = 'UTF-KOTHAPALLI-001';
const ADMIN_PASS = 'NAGABABU001';

export default function AdminLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (id === ADMIN_ID && password === ADMIN_PASS) {
        sessionStorage.setItem('utf_admin', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid ID or Password');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <div className={styles.loginLogo}>
          <img src="/images/logo.png" alt="UTF Logo" />
        </div>
        <h2 className={styles.loginTitle}>Admin Panel</h2>
        <p className={styles.loginSub}>UTF U. Kothapalli</p>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label>Admin ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter Admin ID"
              required
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>

          {error && <div className={styles.errorMsg}>⚠ {error}</div>}

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>

        <a href="/" className={styles.backLink}>← Back to Website</a>
      </div>
    </div>
  );
}
