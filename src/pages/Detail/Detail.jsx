import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import InfoBlock from '../../components/InfoBlock/InfoBlock'
import Footer from '../../components/Footer/Footer'
import { getCountryByCode } from '../../services/api'
import { getDescription } from '../../data/countryDescriptions'
import styles from './Detail.module.css'

function Detail() {
  const { code }    = useParams()
  const navigate    = useNavigate()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  const fetchCountry = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const response = await getCountryByCode(code)
      const data = Array.isArray(response.data) ? response.data[0] : response.data
      setCountry(data)
    } catch (err) {
      console.error('Erro ao buscar país:', err)
      setError('País não encontrado ou erro de conexão.')
    } finally {
      setLoading(false)
    }
  }, [code])

  useEffect(() => {
    fetchCountry()
  }, [fetchCountry])

  function getLanguages(langs) {
    if (!langs) return 'N/A'
    return Object.values(langs).join(', ')
  }

  function getCurrency(currencies) {
    if (!currencies) return 'N/A'
    const keys = Object.keys(currencies)
    if (keys.length === 0) return 'N/A'
    const key = keys[0]
    const cur = currencies[key]
    return `${cur.name} - ${key} - ${cur.symbol || '?'}`
  }

  function formatArea(area) {
    if (!area && area !== 0) return 'N/A'
    return new Intl.NumberFormat('pt-BR').format(Math.round(area)) + ' km²'
  }

  function formatPop(n) {
    if (!n && n !== 0) return 'N/A'
    return new Intl.NumberFormat('pt-BR').format(n)
  }

  if (loading) {
    return (
      <div className={styles.page}>
        <Header showBack />
        <div className={styles.centerMsg}>
          <div className={styles.spinner} />
          <p>Carregando detalhes do país...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !country) {
    return (
      <div className={styles.page}>
        <Header showBack />
        <div className={styles.centerMsg}>
          <p>{error || 'País não encontrado.'}</p>
          <button onClick={() => navigate('/')}>← Voltar para a lista</button>
        </div>
        <Footer />
      </div>
    )
  }

  const desc = getDescription(country.cca3)

  return (
    <div className={styles.page}>
      <Header showBack activeRegion={country.region} />

      <main className={styles.main}>
        <div className={styles.flagWrapper}>
          <img
            src={country.flags?.png || country.flags?.svg}
            alt={`Bandeira de ${country.name?.common}`}
            className={styles.flag}
          />
        </div>

        <h1 className={styles.officialName}>{country.name?.official}</h1>
        <p className={styles.commonName}>{country.name?.common}</p>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <InfoBlock icon="🏛️" label="Capital"    value={country.capital?.[0]} />
            <InfoBlock icon="🌍" label="Continent"  value={country.continents?.[0]} />
            <InfoBlock icon="📍" label="Sub-Region" value={country.subregion} />
            <InfoBlock icon="📐" label="Area"       value={formatArea(country.area)} />
          </div>
          <div className={styles.infoCard}>
            <InfoBlock icon="👥" label="Population"   value={formatPop(country.population)} />
            <InfoBlock icon="🔤" label="Languages"    value={getLanguages(country.languages)} />
            <InfoBlock icon="💰" label="Currency"     value={getCurrency(country.currencies)} />
            <InfoBlock icon="🏷️" label="Country Code" value={country.cca3} />
          </div>
        </div>

        <section className={styles.descSection}>
          <div className={styles.descImage}>
            <img src={desc.image} alt={desc.title} />
          </div>
          <div className={styles.descContent}>
            <h2 className={styles.descTitle}>{desc.title}</h2>
            <p className={styles.descText}>{desc.text}</p>
            <span className={styles.discoverLink}>DISCOVER MORE →</span>
          </div>
        </section>

        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Voltar para a lista
        </button>
      </main>

      <Footer />
    </div>
  )
}

export default Detail