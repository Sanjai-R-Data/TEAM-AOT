import React, { useCallback, useEffect, useState } from 'react'
import { FaSatellite, FaExclamationCircle, FaInbox } from 'react-icons/fa'
import Navbar from '../components/Navbar.jsx'
import DashboardCards from '../components/DashboardCards.jsx'
import MapComponent from '../components/MapComponent.jsx'
import IncidentTable from '../components/IncidentTable.jsx'
import Analytics from '../components/Analytics.jsx'
import Footer from '../components/Footer.jsx'
import { fetchReports, syncData } from '../services/api.js'
import { buildStats } from '../services/utils.js'

function Home() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [syncing, setSyncing] = useState(false)

  const loadReports = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchReports()
      setReports(data)
    } catch (err) {
      setError(
        err?.response
          ? `Backend responded with an error (${err.response.status}).`
          : 'Could not reach the backend at 127.0.0.1:8000. Confirm the API server is running.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadReports()
  }, [loadReports])

  const handleSync = async () => {
    setSyncing(true)
    try {
      await syncData()
      await loadReports()
    } catch (err) {
      setError(
        err?.response
          ? `Sync failed (${err.response.status}).`
          : 'Sync failed — could not reach the backend.'
      )
    } finally {
      setSyncing(false)
    }
  }

  const stats = buildStats(reports)

  return (
    <>
      <Navbar onSync={handleSync} syncing={syncing} />

      <main className="home-page">
        {loading && (
          <div className="state-panel">
            <FaSatellite className="state-icon" />
            <h4>Establishing Connection</h4>
            <p>Pulling live incident data from the coordination server…</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-panel error">
            <FaExclamationCircle className="state-icon" />
            <h4>Unable to Load Incidents</h4>
            <p>{error}</p>
            <button className="retry-btn" onClick={loadReports}>
              Retry Connection
            </button>
          </div>
        )}

        {!loading && !error && reports.length === 0 && (
          <div className="state-panel">
            <FaInbox className="state-icon" />
            <h4>No Incidents Reported</h4>
            <p>Trigger a data sync or wait for the next incoming feed update.</p>
          </div>
        )}

        {!loading && !error && reports.length > 0 && (
          <>
            <div className="section-heading">
              <span className="index">01</span>
              <h2>Operational Overview</h2>
              <span className="rule" />
            </div>
            <DashboardCards stats={stats} />

            <div className="section-heading">
              <span className="index">02</span>
              <h2>Live Incident Map</h2>
              <span className="rule" />
            </div>
            <MapComponent reports={reports} />

            <div className="section-heading">
              <span className="index">03</span>
              <h2>Incident Log</h2>
              <span className="rule" />
            </div>
            <IncidentTable reports={reports} />

            <div className="section-heading">
              <span className="index">04</span>
              <h2>Analytics</h2>
              <span className="rule" />
            </div>
            <Analytics reports={reports} />
          </>
        )}
      </main>

      <Footer />
    </>
  )
}

export default Home
