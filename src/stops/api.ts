import type { NearbyStop } from "./types";

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
