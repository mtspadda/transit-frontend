
export type ArrivalStatus = 'SCHEDULED' | 'REALTIME' | 'CANCELED' | 'SKIPPED'

export type TransportType = 'BUS' | 'RAIL' | 'TRAM' | 'LUAS_RED' | 'LUAS_GREEN'

export interface NearbyStop {
  id: string
  code: string | null
  name: string
  lat: number
  lon: number
  distanceMeters: number
  transportType: TransportType
}

export interface Point {
  lat: number,
  lon: number
}

export interface Arrival {
  tripId: string
  route: string | null
  headsign: string | null
  scheduledAt: string
  expectedAt: string | null
  delaySeconds: number | null
  status: ArrivalStatus
  minutesAway: number
}
