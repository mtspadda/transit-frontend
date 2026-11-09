import { useEffect, useState } from 'react'
import { findNearbyStops } from './stops/api'
import { StopArrivals } from './stops/StopArrivals'
import { StopList } from './stops/StopList'
import { StopMap } from './stops/StopMap'
import type { NearbyStop, Point } from './stops/types'
import './App.css'

const SPIRE: Point = { lat: 53.3498, lon: -6.2603 }
const RADIUS_METERS = 500

export default function App() {
  const [center, setCenter] = useState<Point>(SPIRE)
  const [stops, setStops] = useState<NearbyStop[]>([])
  const [selectedStop, setSelectedStop] = useState<NearbyStop | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    findNearbyStops(center.lat, center.lon, RADIUS_METERS)
      .then((result) => {
        if (!ignore) setStops(result)
      })
      .catch((e: Error) => {
        if (!ignore) setError(e.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [center])

  function handleMapClick(point: Point) {
      setCenter(point)
      setSelectedStop(null)
      setLoading(true)
      setError(null)
    }

    return (
      <div className="layout">
        <StopMap
          center={center}
          radius={RADIUS_METERS}
          stops={stops}
          selectedStopId={selectedStop?.id ?? null}
          onMapClick={handleMapClick}
          onStopClick={setSelectedStop}
        />
        <aside className="sidebar">
          {selectedStop ? (
            <StopArrivals
              key={selectedStop.id}
              stop={selectedStop}
              onBack={() => setSelectedStop(null)}
            />
          ) : (
            <>
              <h1>Next stops</h1>
              {loading && <p>Loading...</p>}
              {error && <p className="error">Erro: {error}</p>}
              {!loading && !error && <StopList stops={stops} onSelect={setSelectedStop} />}
            </>
          )}
        </aside>
      </div>
    )
  }
