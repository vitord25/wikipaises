import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ErrorBoundary: captura erros de render e mostra mensagem útil
// em vez de deixar a tela em branco
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('WikiPaíses — Erro capturado:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '100vh', fontFamily: 'sans-serif',
          padding: '2rem', textAlign: 'center', gap: '1rem'
        }}>
          <h1 style={{ fontSize: '2rem' }}>⚠️ Algo deu errado</h1>
          <p style={{ color: '#666', maxWidth: '500px' }}>
            Erro na aplicação. Veja os detalhes abaixo e pressione F12 para mais informações.
          </p>
          <pre style={{
            background: '#f5f5f5', padding: '1rem', borderRadius: '8px',
            fontSize: '0.8rem', maxWidth: '600px', textAlign: 'left',
            whiteSpace: 'pre-wrap', wordBreak: 'break-word'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 20px', background: '#2c5f8a', color: 'white',
              border: 'none', borderRadius: '6px', cursor: 'pointer'
            }}
          >
            Recarregar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)