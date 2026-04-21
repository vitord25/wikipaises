import { useNavigate } from 'react-router-dom'
import styles from './Card.module.css'

const REGION_LABEL = {
  Europe: 'EUROPE',
  Americas: 'AMERICAS',
  Asia: 'ASIA',
  Africa: 'AFRICA',
  Oceania: 'OCEANIA',
}

function Card({ country }) {
  const navigate = useNavigate()

  // Formata a população: 214.3M, 67.5M, etc.
  const formatPop = (n) => {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
    return n.toString()
  }

  const handleClick = () => navigate(`/country/${country.cca3}`)

  return (
    <article className={styles.card} onClick={handleClick}>
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
            {REGION_LABEL[country.region] || country.region}
          </span>
        </div>

        <p className={styles.capital}>
          <span className={styles.icon}>📍</span>
          {country.capital?.[0] || 'N/A'}
        </p>

        <p className={styles.population}>
          <span className={styles.icon}>👥</span>
          {formatPop(country.population)} RESIDENTS
        </p>
      </div>
    </article>
  )
}

export default Card