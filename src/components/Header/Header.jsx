import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

const REGIONS = ['Europe', 'Americas', 'Asia', 'Africa', 'Oceania']

function Header({ activeRegion = '', onRegionChange, showBack = false }) {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {showBack && (
            <button className={styles.backBtn} onClick={() => navigate('/')}>
              ← Voltar para a lista
            </button>
          )}
          <Link to="/" className={styles.logo}>WikiPaíses</Link>
        </div>

        <nav className={styles.nav}>
          {REGIONS.map((region) => (
            <button
              key={region}
              className={`${styles.navItem} ${activeRegion === region ? styles.active : ''}`}
              onClick={() => onRegionChange && onRegionChange(region === activeRegion ? '' : region)}
            >
              {region}
            </button>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconBtn}>🌐</button>
          <button className={styles.iconBtn}>👤</button>
        </div>
      </div>
    </header>
  )
}

export default Header