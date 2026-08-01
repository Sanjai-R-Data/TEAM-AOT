import React, { useEffect, useState } from 'react'
import { FaSatelliteDish, FaSync } from 'react-icons/fa'

function Navbar({ onSync, syncing }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeString = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  const dateString = now.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="navbar-logo">
            <FaSatelliteDish />
          </div>
          <div className="navbar-titles">
            <h1>AI Disaster Response Coordinator</h1>
            <span>Emergency Operations Center &middot; Live Feed</span>
          </div>
        </div>

        <div className="navbar-right">
          <div className="navbar-clock">
            <div className="time">{timeString}</div>
            <div className="date">{dateString}</div>
          </div>

          <button className="sync-btn" onClick={onSync} disabled={syncing}>
            <FaSync className={syncing ? 'spin' : ''} />
            {syncing ? 'Syncing…' : 'Sync Data'}
          </button>
        </div>
      </div>
      <div className="signal-strip" />
    </header>
  )
}

export default Navbar
