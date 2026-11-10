import { useEffect, useState } from 'react'
import { findArrivals } from './api'
import type { Arrival, NearbyStop } from './types'

interface StopArrivalsProps {
  stop: NearbyStop
  onBack: () => void
}

const REFRESH_MS = 30_000

const timeFormat = new Intl.DateTimeFormat('en-IE', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Dublin',
})

function routeBadgeClass(route: string | null): string {
  switch (route?.toLowerCase()) {
    case 'green':
      return 'route-badge luas-green'
    case 'red':
      return 'route-badge luas-red'
    default:
      return 'route-badge bus'
  }
}

function describe(arrival: Arrival): { main: string; detail: string; className: string } {
  const time = timeFormat.format(new Date(arrival.expectedAt ?? arrival.scheduledAt))
  const minutes = arrival.minutesAway <= 0 ? 'Due now' : `${arrival.minutesAway} min`

  switch (arrival.status) {
    case 'CANCELED':
      return { main: 'canceled', detail: time, className: 'canceled' }
    case 'SKIPPED':
      return { main: 'doenst stop here', detail: time, className: 'canceled' }
    case 'REALTIME': {
      const delayMinutes = Math.round((arrival.delaySeconds ?? 0) / 60)
      if (delayMinutes > 0) {
        return { main: minutes, detail: `${time} · +${delayMinutes} min`, className: 'late' }
      }
      if (delayMinutes < 0) {
        return { main: minutes, detail: `${time} · ${-delayMinutes} min early`, className: 'live' }
      }
      return { main: minutes, detail: `${time} · on time`, className: 'live' }
    }
    default:
      return { main: minutes, detail: `${time} · scheduled`, className: '' }
  }
}

export function StopArrivals({ stop, onBack }: StopArrivalsProps) {
  const [arrivals, setArrivals] = useState<Arrival[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    function load() {
      findArrivals(stop.id)
        .then((result) => {
          if (!ignore) {
            setArrivals(result)
            setError(null)
          }
        })
        .catch((e: Error) => {
          if (!ignore) setError(e.message)
        })
        .finally(() => {
          if (!ignore) setLoading(false)
        })
    }

    load()
    const timer = setInterval(load, REFRESH_MS)

    return () => {
      ignore = true
      clearInterval(timer)
    }
  }, [stop.id])

  return (
    <div>
      <button type="button" className="back-button" onClick={onBack}>
        ← Back
      </button>

      <h2>{stop.name}</h2>
      {stop.code && <p className="stop-meta">Stop {stop.code}</p>}

      {loading && <p>Carregando...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && arrivals.length === 0 && !error && (
        <p>No bus for the next hour.</p>
      )}

      {!loading && arrivals.length > 0 && (
        <ul className="arrival-list">
          {arrivals.map((arrival) => {
            const { main, detail, className } = describe(arrival)
            return (
              <li key={`${arrival.tripId}-${arrival.scheduledAt}`} className={`arrival ${className}`}>
                <span className={routeBadgeClass(arrival.route)}>{arrival.route ?? '?'}</span>
                <span className="arrival-headsign">{arrival.headsign ?? 'Destiny not informed'}</span>
                <span className="arrival-time">
                  {main}
                  <small>{detail}</small>
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
