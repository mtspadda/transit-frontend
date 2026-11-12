# Dublin Transit Monitor: Frontend

A web map for finding public transport stops around Dublin and seeing when the next bus, train or Luas arrives, with live delays.

This is the frontend of the Dublin Transit Monitor. The data and the API come from the backend: [dublin-transit-monitor](https://github.com/mtspadda/transit).

## Features

- **Nearby stops:** click anywhere on the map to see the stops within 500 m, ordered by distance.
- **Your location:** on startup, the map moves to your current position if you allow it, and falls back to the city centre otherwise.
- **Colour by transport type:** bus stops in yellow, Luas Red and Green Line stops in their line colours, and rail stations in blue.
- **Next arrivals:** select a stop to see the upcoming services, refreshed every 30 seconds.
- **Live status:** each arrival shows whether it is on time, late or early, or cancelled, when real-time data is available.

## Tech stack

- [React](https://react.dev/) with TypeScript
- [Vite](https://vite.dev/) for development and builds
- [Leaflet](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/) for the map
- [OpenStreetMap](https://www.openstreetmap.org/) map tiles

## Getting started

### Requirements

- Node.js (current LTS version)
- The backend running on `http://localhost:8080`. See the backend README for how to start it.

### Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

During development, Vite forwards every request starting with `/api` to the backend on port 8080 (see `vite.config.ts`). This avoids CORS issues, so the backend needs no extra configuration.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── stops/
│   ├── types.ts          # Types matching the backend API responses
│   ├── api.ts            # Calls to the backend API
│   ├── StopMap.tsx       # Map with the search area and the stops
│   ├── StopList.tsx      # List of nearby stops
│   └── StopArrivals.tsx  # Next arrivals for the selected stop
├── App.tsx               # Page layout and shared state
├── App.css
├── index.css             # Global styles
└── main.tsx              # Entry point
```

## Notes

- **Location access** needs a secure context: it works on `localhost` and on HTTPS, but not on plain HTTP addresses such as a local network IP.
- **Real-time coverage** depends on the operator. Services without live data are shown with their scheduled times.

## Data and attribution

- Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
- Transport data from the [National Transport Authority](https://www.nationaltransport.ie/) through [Transport for Ireland](https://www.transportforireland.ie/) open data.
