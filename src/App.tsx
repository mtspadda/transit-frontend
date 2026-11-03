import { useEffect, useState } from 'react'
import { findNearbyStops } from './stops/api'
import type { NearbyStop } from './stops/types'

export default function App() {
  const [stops, setStops] = useState<NearbyStop[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    //Test values
    findNearbyStops(53.3498, -6.2603, 50, 10)
      .then(setStops)
      .catch((e: Error) => setError(e.message))
  }, [])

  if (error) {
    return <p>Erro: {error}</p>
  }

  return (
    <ul>
      {stops.map((stop) => (
        <li key={stop.id}>
          {stop.name} ({stop.distanceMeters} m)
        </li>
      ))}
    </ul>
  )
}
