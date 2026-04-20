import { useParams } from 'react-router-dom'

function Detail() {
  const { code } = useParams()
  // ex: /country/BRA → code = "BRA"

  return (
    <div>
      <h1>Tela Detail</h1>
      <p>Código do país: <strong>{code}</strong></p>
    </div>
  )
}

export default Detail