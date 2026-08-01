import React, { useEffect, useState, useRef } from 'react'
import {
  FaExclamationTriangle,
  FaFire,
  FaWater,
  FaTools,
  FaListUl
} from 'react-icons/fa'

// Animates a number counting up from 0 to `value` whenever value changes.
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    const start = performance.now()
    const from = display
    const to = value
    const duration = 700

    const step = (timestamp) => {
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <>{display}</>
}

function DashboardCards({ stats }) {
  const cards = [
    {
      key: 'total',
      label: 'Total Incidents',
      value: stats.total,
      icon: <FaListUl />,
      accent: '--accent-primary',
      accentSoft: '--accent-primary-soft'
    },
    {
      key: 'fire',
      label: 'Fire Incidents',
      value: stats.fire,
      icon: <FaFire />,
      accent: '--accent-critical',
      accentSoft: '--accent-critical-soft'
    },
    {
      key: 'flood',
      label: 'Flood Incidents',
      value: stats.flood,
      icon: <FaWater />,
      accent: '--accent-primary',
      accentSoft: '--accent-primary-soft'
    },
    {
      key: 'critical',
      label: 'Critical Incidents',
      value: stats.critical,
      icon: <FaExclamationTriangle />,
      accent: '--accent-warning',
      accentSoft: '--accent-warning-soft'
    },
    {
      key: 'resources',
      label: 'Available Resources',
      value: stats.resources,
      icon: <FaTools />,
      accent: '--accent-success',
      accentSoft: '--accent-success-soft'
    }
  ]

  return (
    <div className="cards-grid">
      {cards.map((card) => (
        <div
          key={card.key}
          className="stat-card"
          style={{
            '--card-accent': `var(${card.accent})`,
            '--card-accent-soft': `var(${card.accentSoft})`
          }}
        >
          <div className="stat-card-top">
            <span className="stat-label">{card.label}</span>
            <div className="stat-icon">{card.icon}</div>
          </div>
          <div className="stat-value">
            <AnimatedNumber value={card.value} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardCards
