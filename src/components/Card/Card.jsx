import { useNavigate } from 'react-router-dom'
import styles from './Card.module.css'

function Card({ country }) {
  const navigate = useNavigate()

  // Formata população: 214300000 → "214.3M"
  const formatPop = (n) => {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
    if (n >= 1_000_000)     return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000)         return `${(n / 1_000).toFixed(0)}K`
    return n.toString()
  }

  return (
    <article className={styles.card} onClick={() => navigate(`/country/${country.cca3}`)}>
      <div className={styles.flagWrapper}>
        <img
          src={country.flags?.png || country.flags?.svg}
          alt={`Bandeira de ${country.name.common}`}
          className={styles.flag}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h2 className={styles.name}>{country.name.common}</h2>
          <span className={`${styles.badge} ${styles[country.region?.toLowerCase()]}`}>
            {country.region?.toUpperCase()}
          </span>
        </div>
        <p className={styles.capital}>📍 {country.capital?.[0] || 'N/A'}</p>
        <p className={styles.population}>👥 {formatPop(country.population)} RESIDENTS</p>
      </div>
    </article>
  )
}

export default Card