import { Circle, CircleMarker, MapContainer, TileLayer, Tooltip, useMapEvents } from 'react-leaflet'
import type { NearbyStop, Point, TransportType } from './types'

const STOP_COLORS: Record<TransportType, string> = {
  LUAS_RED: '#e4002b',
  LUAS_GREEN: '#00a650',
  TRAM: '#7c3aed',
  RAIL: '#2563eb',
  BUS: '#f5b800',
}

interface StopMapProps {
  center: Point
  radius: number
  stops: NearbyStop[]
  selectedStopId: string | null
  onMapClick: (point: Point) => void
  onStopClick: (stop: NearbyStop) => void
}

export function StopMap({ center, radius, stops, selectedStopId, onMapClick, onStopClick }: StopMapProps) {
  return (
    <MapContainer center={[center.lat, center.lon]} zoom={16} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickHandler onMapClick={onMapClick} />

      <Circle
        center={[center.lat, center.lon]}
        radius={radius}
        pathOptions={{ color: '#2563eb', fillOpacity: 0.08 }}
      />

      {stops.map((stop) => {
        const selected = stop.id === selectedStopId
        return (
          <CircleMarker
            key={stop.id}
            center={[stop.lat, stop.lon]}
            radius={selected ? 10 : 7}
            bubblingMouseEvents={false}
            eventHandlers={{ click: () => onStopClick(stop) }}
            pathOptions={{
              color: selected ? '#111827' : STOP_COLORS[stop.transportType],
              weight: selected ? 3 : 1,
              fillColor: STOP_COLORS[stop.transportType],
              fillOpacity: 0.9,
            }}
          >
            <Tooltip>{stop.name}</Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}

function ClickHandler({ onMapClick }: { onMapClick: (point: Point) => void }) {
  useMapEvents({
    click(event) {
      onMapClick({ lat: event.latlng.lat, lon: event.latlng.lng })
    },
  })
  return null
}
