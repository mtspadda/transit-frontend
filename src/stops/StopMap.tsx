import { Circle, CircleMarker, MapContainer, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import type { NearbyStop, Point } from './types'

interface StopMapProps {
  center: Point
  radius: number
  stops: NearbyStop[]
  onMapClick: (point: Point) => void
}

export function StopMap({ center, radius, stops, onMapClick }: StopMapProps) {
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
        pathOptions={{color: '#2563EB', fillOpacity: 0.08}}
      />
      {stops.map((stop) => (
            <CircleMarker
              key={stop.id}
              center={[stop.lat, stop.lon]}
              radius={7}
              bubblingMouseEvents={false}
              pathOptions={{ color: '#dc2626', fillOpacity: 0.8 }}
            >
              <Popup>
                <strong>{stop.name}</strong>
                <br />
                {stop.code && `Parada ${stop.code} · `}
                {stop.distanceMeters} m
              </Popup>
            </CircleMarker>
          ))}
    </MapContainer>
  )

  function ClickHandler({ onMapClick }: { onMapClick: (point: Point) => void }) {
    useMapEvents({
      click(event) {
        onMapClick({ lat: event.latlng.lat, lon: event.latlng.lng})
      },
    })
    return null
  }
}
