import React, { useMemo } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { getDisasterColor, getSeverityColor, SEVERITY_ORDER } from '../services/utils.js'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const textMuted = '#b7c6de'
const gridColor = 'rgba(255,255,255,0.06)'

function Analytics({ reports }) {
  const disasterDistribution = useMemo(() => {
    const counts = {}
    reports.forEach((r) => {
      const type = r.disaster_type || 'Unknown'
      counts[type] = (counts[type] || 0) + 1
    })
    const labels = Object.keys(counts)
    return {
      labels,
      datasets: [
        {
          data: labels.map((l) => counts[l]),
          backgroundColor: labels.map((l) => getDisasterColor(l)),
          borderColor: '#0f1d33',
          borderWidth: 2
        }
      ]
    }
  }, [reports])

  const severityDistribution = useMemo(() => {
    const counts = {}
    reports.forEach((r) => {
      const sev = r.severity || 'Unknown'
      counts[sev] = (counts[sev] || 0) + 1
    })
    const labels = Object.keys(counts).sort(
      (a, b) => SEVERITY_ORDER.indexOf(a) - SEVERITY_ORDER.indexOf(b)
    )
    return {
      labels,
      datasets: [
        {
          label: 'Incidents',
          data: labels.map((l) => counts[l]),
          backgroundColor: labels.map((l) => getSeverityColor(l)),
          borderRadius: 6,
          maxBarThickness: 46
        }
      ]
    }
  }, [reports])

  const resourceUtilization = useMemo(() => {
    const counts = {}
    reports.forEach((r) => {
      const res = r.resource_type || r.resource_name || 'Unassigned'
      counts[res] = (counts[res] || 0) + 1
    })
    const labels = Object.keys(counts)
    return {
      labels,
      datasets: [
        {
          label: 'Assignments',
          data: labels.map((l) => counts[l]),
          backgroundColor: labels.map((l) => getDisasterColor(l)),
          borderRadius: 6,
          maxBarThickness: 46
        }
      ]
    }
  }, [reports])

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: textMuted, font: { family: 'Inter', size: 11 } }
      }
    }
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { color: textMuted, font: { family: 'Inter', size: 11 } },
        grid: { color: gridColor }
      },
      y: {
        beginAtZero: true,
        ticks: { color: textMuted, font: { family: 'JetBrains Mono', size: 11 }, precision: 0 },
        grid: { color: gridColor }
      }
    }
  }

  return (
    <div className="analytics-grid">
      <div className="chart-panel">
        <h3>Disaster Distribution</h3>
        <div className="chart-canvas-wrap">
          <Pie data={disasterDistribution} options={pieOptions} />
        </div>
      </div>

      <div className="chart-panel">
        <h3>Severity Distribution</h3>
        <div className="chart-canvas-wrap">
          <Bar data={severityDistribution} options={barOptions} />
        </div>
      </div>

      <div className="chart-panel full-width">
        <h3>Resource Utilization</h3>
        <div className="chart-canvas-wrap">
          <Bar data={resourceUtilization} options={barOptions} />
        </div>
      </div>
    </div>
  )
}

export default Analytics
