# AI Disaster Response Coordinator — Frontend

Government-grade Emergency Operations Center dashboard. React (Vite) frontend only — plugs directly into your existing FastAPI backend at `http://127.0.0.1:8000`.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

## Requirements

- Your backend must already be running at `http://127.0.0.1:8000` with `GET /reports` and `POST /sync-data` available.
- No backend code is included here — this is frontend only, as requested.

## Stack

- React (Vite)
- Axios
- React Leaflet + Leaflet (map, centered on Tamil Nadu)
- Chart.js + react-chartjs-2 (analytics)
- React Icons
- Plain CSS (no Tailwind/Bootstrap/MUI) — design tokens in `src/styles/dashboard.css`

## Structure

```
src/
  assets/
  components/
    Navbar.jsx
    DashboardCards.jsx
    MapComponent.jsx
    IncidentTable.jsx
    Analytics.jsx
    Footer.jsx
  pages/
    Home.jsx
  services/
    api.js       -> axios calls to /reports and /sync-data
    utils.js      -> shared color mapping + stat derivation (nothing hardcoded)
  styles/
    dashboard.css
  App.jsx
  main.jsx
```

All dashboard numbers, map markers, table rows, and charts are computed live from the `GET /reports` response — nothing is hardcoded.
