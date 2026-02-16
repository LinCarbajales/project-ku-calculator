import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './App.css'

function App() {
  // Estados para los datos del formulario
  const [numPaginas, setNumPaginas] = useState('')
  const [pagoPorPagina, setPagoPorPagina] = useState(0.004)
  const [objetivoMensual, setObjetivoMensual] = useState('')
  const [paginasSemana1, setPaginasSemana1] = useState('')
  
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

  // Calcular distribución basada en páginas de la semana 1
  const calcularDistribucion = () => {
    const semana1 = Number(paginasSemana1) || 0
    
    // Si ya cumplimos el objetivo en semana 1
    if (semana1 >= paginasTotalesNecesarias) {
      return [semana1, 0, 0, 0]
    }
    
    // Calcular cuánto falta
    const faltante = paginasTotalesNecesarias - semana1
    const porSemanaRestante = Math.ceil(faltante / 3)
    
    // Distribuir el faltante
    const semana2 = Math.min(porSemanaRestante, faltante)
    const semana3 = Math.min(porSemanaRestante, faltante - semana2)
    const semana4 = faltante - semana2 - semana3
    
    return [semana1, semana2, semana3, semana4]
  }

  const distribucion = paginasSemana1 && paginasTotalesNecesarias > 0 
    ? calcularDistribucion() 
    : [0, 0, 0, 0]

  const datosSemanas = [
    { semana: 'Semana 1', paginas: distribucion[0], ingresos: (distribucion[0] * pagoPorPagina).toFixed(2) },
    { semana: 'Semana 2', paginas: distribucion[1], ingresos: (distribucion[1] * pagoPorPagina).toFixed(2) },
    { semana: 'Semana 3', paginas: distribucion[2], ingresos: (distribucion[2] * pagoPorPagina).toFixed(2) },
    { semana: 'Semana 4', paginas: distribucion[3], ingresos: (distribucion[3] * pagoPorPagina).toFixed(2) }
  ]

  return (
    <div className="App">
      <h1>📚 Calculadora de Ingresos Kindle Unlimited</h1>
      
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
          <>
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

            <hr />

            <div className="campo">
              <label htmlFor="semana1">Páginas leídas en la Semana 1:</label>
              <input
                id="semana1"
                type="number"
                value={paginasSemana1}
                onChange={(e) => setPaginasSemana1(e.target.value)}
                placeholder="Ej: 5000"
              />
            </div>

            {paginasSemana1 && (
              <div className="grafico">
                <h2>Proyección de páginas por semana</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={datosSemanas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semana" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="paginas" fill="#8884d8" name="Páginas" />
                  </BarChart>
                </ResponsiveContainer>
                
                {distribucion[0] >= paginasTotalesNecesarias && (
                  <p className="exito">¡Ya cumpliste tu objetivo en la primera semana! 🎉</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App