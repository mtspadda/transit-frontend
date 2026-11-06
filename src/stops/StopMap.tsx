import { Circle, CircleMarker, MapContainer, TileLayer, Tooltip, useMapEvents } from 'react-leaflet'
import type { NearbyStop, Point } from './types'

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
              color: selected ? '#16a34a' : '#dc2626',
              fillOpacity: 0.8,
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
