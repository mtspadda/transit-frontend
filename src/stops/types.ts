export interface NearbyStop {
  id: string
  code: string | null
  name: string
  lat: number
  lon: number
  distanceMeters: number
}

export interface Point {
  lat: number,
  lon: number
}
