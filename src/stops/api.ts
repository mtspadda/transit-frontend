import type { Arrival, NearbyStop } from "./types";

export async function findNearbyStops(
  lat: number,
  lon: number,
  radius = 500,
  limit = 20,
): Promise<NearbyStop[]> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    radius: String(radius),
    limit: String(limit)
  })

  const response = await fetch(`/api/stops/nearby?${params}`)

  if (!response.ok) {
    throw new Error(`Failed to load stops: HTTP ${response.status}`)
  }

  return response.json()
}

export async function findArrivals(stopId: string, minutes = 60): Promise<Arrival[]>{
  const params = new URLSearchParams({ minutes: String(minutes) })
  const response = await fetch(`/api/stops/${encodeURIComponent(stopId)}/arrivals?${params}`)

  if (!response.ok) {
    throw new Error(`Failed to load Arrivals: HTTP ${response.status}`)
  }

  return response.json()
}
