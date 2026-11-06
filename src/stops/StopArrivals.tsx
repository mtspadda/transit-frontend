import { useEffect, useState } from "react";
import type { Arrival, NearbyStop } from "./types";
import { findArrival } from "./api";

interface StopArrivalsProps {
  stop: NearbyStop
  onBack: () => void
}

const timeFormat = new Intl.DateTimeFormat('en-IE', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Dublin',
})

export function StopArrivals({ stop, onBack}: StopArrivalsProps ) {
  const [arrivals, setArrival] = useState<Arrival[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    findArrival(stop.id)
      .then((result) => {
        if (!ignore) setArrival(result)
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
  }, [stop.id])


  return (
    <div>
      <button type="button" className="back-button" onClick={onBack}>
        ← Voltar
      </button>

      <h2>{stop.name}</h2>
      {stop.code && <p className="stop-meta">Parada {stop.code}</p>}

      {loading && <p>Carregando...</p>}
      {error && <p className="error">Erro: {error}</p>}

      {!loading && !error && arrivals.length === 0 && (
        <p>Nenhum ônibus programado na próxima hora.</p>
      )}

      {!loading && !error && arrivals.length > 0 && (
        <ul className="arrival-list">
          {arrivals.map((arrival) => (
            <li key={`${arrival.tripId}-${arrival.scheduledAt}`} className="arrival">
              <span className="route-badge">{arrival.route ?? '?'}</span>
              <span className="arrival-headsign">{arrival.headsign ?? 'Destino não informado'}</span>
              <span className="arrival-time">
                {arrival.minutesAway <= 0 ? 'agora' : `${arrival.minutesAway} min`}
                <small>{timeFormat.format(new Date(arrival.scheduledAt))}</small>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
