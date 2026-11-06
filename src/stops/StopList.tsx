import type { NearbyStop } from "./types";

interface StopListProps {
  stops: NearbyStop[]
  onSelect: (stop: NearbyStop) => void
}

export function StopList({ stops, onSelect }: StopListProps) {
  if (stops.length === 0) {
    return <p> None stop were found.</p>
  }
  return (
    <ol className="stop-list">
      {stops.map((stop) => (
        <li key={stop.id}>
          <button type="button" className="stop-button" onClick={() => onSelect(stop)}>
            <span className="stop-name">{stop.name}</span>
            <span className="stop-meta">
              {stop.code && `Parada ${stop.code} · `}
              {stop.distanceMeters} m
            </span>
          </button>
        </li>
      ))}
    </ol>
  )
}
