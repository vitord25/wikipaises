import { useState, useEffect, useCallback } from 'react'
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card'
import Footer from '../../components/Footer/Footer'
import { getAllCountries } from '../../services/api'
import styles from './Home.module.css'

const COUNTRIES_PER_PAGE = 8

function Home() {
  const [allCountries, setAllCountries] = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState('')
  const [search, setSearch]             = useState('')
  const [activeRegion, setActiveRegion] = useState('')
  const [page, setPage]                 = useState(1)

  
  const fetchCountries = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const response = await getAllCountries()
      const sorted = response.data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      )
      setAllCountries(sorted)
    } catch (err) {
      console.error(err)
      setError('Não foi possível carregar os países. Verifique sua conexão.')
    } finally {
      setLoading(false)
    }
  }, [])


  useEffect(() => {
    fetchCountries()
  }, [fetchCountries])

  const filtered = allCountries
    .filter((c) => !activeRegion || c.region === activeRegion)
    .filter((c) => !search.trim() || c.name.common.toLowerCase().includes(search.toLowerCase()))


  // Paginação
  const totalPages    = Math.max(1, Math.ceil(filtered.length / COUNTRIES_PER_PAGE))
  const safePageNumber = Math.min(page, totalPages)
  const start         = (safePageNumber - 1) * COUNTRIES_PER_PAGE
  const pageItems     = filtered.slice(start, start + COUNTRIES_PER_PAGE)

  const handleSearch = (value) => {
  setSearch(value);
    setPage(1)
  }

  const handleRegionChange = (region) => {
  setActiveRegion(region);
  setPage(1)
  }

  return (
    <div className={styles.page}>
      <Header
        activeRegion={activeRegion}
        onRegionChange={handleRegionChange}
      />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Explore the Atlas</h1>
          <p className={styles.heroSub}>
            A CURATED DIGITAL ARCHIVE OF SOVEREIGN NATIONS AND CULTURES.
          </p>
        </section>

        <div className={styles.toolbar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by nation, capital, or history..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <select
            className={styles.regionSelect}
            value={activeRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
          >
            <option value="">🌐 All Continents</option>
            <option value="Europe">Europe</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {loading && (
          <div className={styles.centerMsg}>
            <div className={styles.spinner} />
            <p>Carregando países...</p>
          </div>
        )}

        {!loading && error && (
          <div className={styles.errorMsg}>
            <p>{error}</p>
            <button onClick={fetchCountries}>Tentar novamente</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className={styles.centerMsg}>
            <p>Nenhum país encontrado para <strong>"{search}"</strong>.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <div className={styles.grid}>
              {pageItems.map((country) => (
                <Card key={country.cca3} country={country} />
              ))}
            </div>

            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setPage((p) => p - 1)}
                disabled={safePageNumber === 1}
              >
                ← PREVIOUS
              </button>

              <span className={styles.pageInfo}>
                Page {safePageNumber} of {totalPages}
              </span>

              <button
                className={styles.pageBtn}
                onClick={() => setPage((p) => p + 1)}
                disabled={safePageNumber === totalPages}
              >
                NEXT →
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Home