import { useState } from 'react'
import './App.css'

function App() {
  // Estados para los datos del formulario
  const [numPaginas, setNumPaginas] = useState('')
  const [pagoPorPagina, setPagoPorPagina] = useState(0.004)
  const [objetivoMensual, setObjetivoMensual] = useState('')
  
  // Calcular ingresos por lectura completa
  const ingresosPorLectura = numPaginas && pagoPorPagina 
    ? (numPaginas * pagoPorPagina).toFixed(2)
    : 0

  // Calcular cuántas PÁGINAS totales se necesitan leer para el objetivo
  const paginasTotalesNecesarias = objetivoMensual && pagoPorPagina > 0
    ? Math.ceil(objetivoMensual / pagoPorPagina)
    : 0

  // Calcular lecturas completas aproximadas (para referencia)
  const lecturasAproximadas = numPaginas > 0 && paginasTotalesNecesarias > 0
    ? (paginasTotalesNecesarias / numPaginas).toFixed(1)
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

        <hr />

        <div className="campo">
          <label htmlFor="objetivo">Objetivo de ingresos mensuales ($):</label>
          <input
            id="objetivo"
            type="number"
            value={objetivoMensual}
            onChange={(e) => setObjetivoMensual(e.target.value)}
            placeholder="Ej: 100"
          />
        </div>

        {objetivoMensual && pagoPorPagina > 0 && (
          <div className="resultado objetivo">
            <h2>Para ganar ${objetivoMensual} al mes necesitas:</h2>
            <p className="paginas-totales">
              📄 {paginasTotalesNecesarias.toLocaleString()} páginas leídas en total
            </p>
            {numPaginas > 0 && (
              <p className="detalle">
                ≈ {lecturasAproximadas} lecturas completas de tu libro
              </p>
            )}
            <p className="detalle-dia">
              Eso son aproximadamente {Math.ceil(paginasTotalesNecesarias / 30).toLocaleString()} páginas leídas por día
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App