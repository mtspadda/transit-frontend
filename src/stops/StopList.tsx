import type { NearbyStop } from "./types";

interface StopListProps {
  stops: NearbyStop[]
}

export function StopList({ stops }: StopListProps) {
  if (stops.length === 0) {
    return <p> None stop were found.</p>
  }
  return (
    <ol className="stop-list">
      {stops.map((stop) => (
        <li key={stop.id}>
          <span className="stop-name">{stop.name}</span>
          <span className="stop-meta">
            {stop.code && `Parada ${stop.code} · `}
            {stop.distanceMeters} m
          </span>
        </li>
      ))}
    </ol>
  )
}
