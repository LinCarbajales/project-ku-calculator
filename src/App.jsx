import { useState } from 'react'
import './App.css'

function App() {
  // Estados para los datos del formulario
  const [numPaginas, setNumPaginas] = useState('')
  const [pagoPorPagina, setPagoPorPagina] = useState(0.004)
  
  // Calcular ingresos por lectura completa
  const ingresosPorLectura = numPaginas && pagoPorPagina 
    ? (numPaginas * pagoPorPagina).toFixed(2)
    : 0

  return (
    <div className="App">
      <h1>📚 Calculadora de ingresos de Kindle Unlimited</h1>
      
      <div className="formulario">
        <div className="campo">
          <label htmlFor="paginas">Número de páginas de tu libro:</label>
          <input
            id="paginas"
            type="number"
            value={numPaginas}
            onChange={(e) => setNumPaginas(e.target.value)}
            placeholder="Ej: 250"
          />
        </div>

        <div className="campo">
          <label htmlFor="pago">Pago por página (KENP):</label>
          <input
            id="pago"
            type="number"
            step="0.0001"
            value={pagoPorPagina}
            onChange={(e) => setPagoPorPagina(e.target.value)}
            placeholder="Ej: 0.004"
          />
        </div>

        <div className="resultado">
          <h2>Ingresos por lectura completa:</h2>
          <p className="ingreso">${ingresosPorLectura}</p>
        </div>
      </div>
    </div>
  )
}

export default App