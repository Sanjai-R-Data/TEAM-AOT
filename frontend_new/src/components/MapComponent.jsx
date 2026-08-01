import React, { useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { DISASTER_COLORS, DEFAULT_DISASTER_COLOR, getDisasterColor, formatConfidence } from '../services/utils.js'

// Centered on Tamil Nadu
const TAMIL_NADU_CENTER = [11.1271, 78.6569]
const DEFAULT_ZOOM = 7

function MapComponent({ reports }) {
  const validReports = useMemo(
    () =>
      reports.filter(
        (r) =>
          typeof r.latitude === 'number' &&
          typeof r.longitude === 'number' &&
          !Number.isNaN(r.latitude) &&
          !Number.isNaN(r.longitude)
      ),
    [reports]
  )

  const legendEntries = [...Object.entries(DISASTER_COLORS), ['Others', DEFAULT_DISASTER_COLOR]]

  return (
    <div className="map-panel">
      <div className="map-panel-header">
        <h3>Live Incident Map — Tamil Nadu</h3>
        <div className="map-legend">
          {legendEntries.map(([label, color]) => (
            <div className="map-legend-item" key={label}>
              <span className="map-legend-dot" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <MapContainer
        center={TAMIL_NADU_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        className="leaflet-map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validReports.map((report) => {
          const color = getDisasterColor(report.disaster_type)
          return (
            <CircleMarker
              key={report.id}
              center={[report.latitude, report.longitude]}
              radius={9}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.75,
                weight: 2
              }}
            >
              <Popup>
                <div className="map-popup">
                  <div className="map-popup-type" style={{ color }}>
                    {report.disaster_type || 'Unknown'}
                  </div>
                  <div className="map-popup-row">
                    <span className="k">Location</span>
                    <span>{report.location || 'N/A'}</span>
                  </div>
                  <div className="map-popup-row">
                    <span className="k">Severity</span>
                    <span>{report.severity || 'N/A'}</span>
                  </div>
                  <div className="map-popup-row">
                    <span className="k">Priority</span>
                    <span>{report.priority || 'N/A'}</span>
                  </div>
                  <div className="map-popup-row">
                    <span className="k">Confidence</span>
                    <span>{formatConfidence(report.confidence)}</span>
                  </div>
                  <div className="map-popup-row">
                    <span className="k">Resource</span>
                    <span>{report.resource_name || 'Unassigned'}</span>
                  </div>
                  {report.description && (
                    <div className="map-popup-desc">{report.description}</div>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default MapComponent
