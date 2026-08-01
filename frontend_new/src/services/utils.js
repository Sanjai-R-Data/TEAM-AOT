// Central place for disaster-type color/severity mapping so every
// component (map, cards, table, charts) stays visually consistent.

export const DISASTER_COLORS = {
  Fire: '#E14B4B',
  Flood: '#2E7DD1',
  Cyclone: '#E8A33D',
  Earthquake: '#9B6BE0',
  Medical: '#3FBF7F'
}

export const DEFAULT_DISASTER_COLOR = '#8AA0C2'

export const getDisasterColor = (type) =>
  DISASTER_COLORS[type] || DEFAULT_DISASTER_COLOR

export const SEVERITY_ORDER = ['Low', 'Medium', 'High', 'Critical']

export const getSeverityColor = (severity) => {
  switch (severity) {
    case 'Critical':
      return '#E14B4B'
    case 'High':
      return '#E8A33D'
    case 'Medium':
      return '#F2C94C'
    case 'Low':
      return '#3FBF7F'
    default:
      return '#8AA0C2'
  }
}

export const formatConfidence = (value) => {
  const num = Number(value)
  if (Number.isNaN(num)) return 'N/A'
  return `${Math.round(num * 100)}%`
}

// Derives every dashboard metric from the raw /reports payload so
// nothing in the UI is ever hardcoded.
export const buildStats = (reports) => {
  const total = reports.length
  const fire = reports.filter((r) => r.disaster_type === 'Fire').length
  const flood = reports.filter((r) => r.disaster_type === 'Flood').length
  const critical = reports.filter((r) => r.priority === 'Critical').length
  const resources = new Set(
    reports.map((r) => r.resource_name).filter(Boolean)
  ).size

  return { total, fire, flood, critical, resources }
}
