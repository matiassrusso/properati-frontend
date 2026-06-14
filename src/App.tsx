import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface Barrio {
  barrio: string
  precio_mediano: number
}

function App() {
  const [barrios, setBarrios] = useState<Barrio[]>([])

  useEffect(() => {
    fetch("http://localhost:8000/barrios")
      .then(res => res.json())
      .then(data => setBarrios(data))
  }, [])

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mercado inmobiliario CABA</h1>
      <p>Precio mediano por m² — Top 15 barrios</p>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barrios} layout="vertical" margin={{ left: 120 }}>
          <XAxis type="number" unit=" USD" />
          <YAxis type="category" dataKey="barrio" width={110} />
          <Tooltip formatter={(value) => `USD ${value}/m²`} />
          <Bar dataKey="precio_mediano" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default App