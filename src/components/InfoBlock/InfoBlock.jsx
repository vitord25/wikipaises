import styles from './InfoBlock.module.css'


function InfoBlock({ icon, label, value }) {
  return (
    <div className={styles.block}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value || 'N/A'}</span>
      </div>
    </div>
  )
}

export default InfoBlock