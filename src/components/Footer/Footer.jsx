import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>WikiPaíses</span>
          <p className={styles.tagline}>© 2024 WIKIPAÍSES. THE DIGITAL CURATOR. ALL RIGHTS RESERVED.</p>
        </div>
        <nav className={styles.links}>
          <a href="#" className={styles.link}>ABOUT THE ATLAS</a>
          <a href="#" className={styles.link}>METHODOLOGY</a>
          <a href="#" className={styles.link}>DATA SOURCES</a>
          <a href="#" className={styles.link}>PRIVACY POLICY</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer