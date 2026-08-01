import React, { useMemo, useState } from 'react'
import { FaSearch, FaSortUp, FaSortDown, FaSort } from 'react-icons/fa'
import { getDisasterColor, getSeverityColor } from '../services/utils.js'

const PAGE_SIZE = 8

const COLUMNS = [
  { key: 'disaster_type', label: 'Disaster' },
  { key: 'location', label: 'Location' },
  { key: 'severity', label: 'Severity' },
  { key: 'priority', label: 'Priority' },
  { key: 'source', label: 'Source' },
  { key: 'description', label: 'Description' },
  { key: 'resource_name', label: 'Resource' }
]

function IncidentTable({ reports }) {
  const [search, setSearch] = useState('')
  const [disasterFilter, setDisasterFilter] = useState('All')
  const [severityFilter, setSeverityFilter] = useState('All')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)

  const disasterOptions = useMemo(
    () => ['All', ...new Set(reports.map((r) => r.disaster_type).filter(Boolean))],
    [reports]
  )
  const severityOptions = useMemo(
    () => ['All', ...new Set(reports.map((r) => r.severity).filter(Boolean))],
    [reports]
  )

  const filtered = useMemo(() => {
    let rows = [...reports]

    if (disasterFilter !== 'All') {
      rows = rows.filter((r) => r.disaster_type === disasterFilter)
    }
    if (severityFilter !== 'All') {
      rows = rows.filter((r) => r.severity === severityFilter)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      rows = rows.filter((r) =>
        [r.disaster_type, r.location, r.description, r.source, r.resource_name]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(q))
      )
    }
    if (sortKey) {
      rows.sort((a, b) => {
        const av = a[sortKey] ?? ''
        const bv = b[sortKey] ?? ''
        if (av < bv) return sortDir === 'asc' ? -1 : 1
        if (av > bv) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
    return rows
  }, [reports, disasterFilter, severityFilter, search, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const sortIcon = (key) => {
    if (sortKey !== key) return <FaSort style={{ opacity: 0.4 }} />
    return sortDir === 'asc' ? <FaSortUp /> : <FaSortDown />
  }

  return (
    <div className="table-panel">
      <div className="table-controls">
        <div className="table-search">
          <FaSearch />
          <input
            placeholder="Search location, description, source…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
        </div>

        <div className="table-filters">
          <select
            value={disasterFilter}
            onChange={(e) => {
              setDisasterFilter(e.target.value)
              setPage(1)
            }}
          >
            {disasterOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'All' ? 'All Disasters' : opt}
              </option>
            ))}
          </select>

          <select
            value={severityFilter}
            onChange={(e) => {
              setSeverityFilter(e.target.value)
              setPage(1)
            }}
          >
            {severityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'All' ? 'All Severities' : opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-scroll">
        <table className="incident-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col.key} onClick={() => handleSort(col.key)}>
                  {col.label} {sortIcon(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} style={{ textAlign: 'center', padding: '30px' }}>
                  No incidents match the current filters.
                </td>
              </tr>
            ) : (
              pageRows.map((r) => {
                const dColor = getDisasterColor(r.disaster_type)
                const sColor = getSeverityColor(r.severity)
                return (
                  <tr key={r.id}>
                    <td>
                      <span className="badge" style={{ color: dColor, background: `${dColor}22` }}>
                        <span className="badge-dot" />
                        {r.disaster_type || 'N/A'}
                      </span>
                    </td>
                    <td>{r.location || 'N/A'}</td>
                    <td>
                      <span className="badge" style={{ color: sColor, background: `${sColor}22` }}>
                        <span className="badge-dot" />
                        {r.severity || 'N/A'}
                      </span>
                    </td>
                    <td>{r.priority || 'N/A'}</td>
                    <td>{r.source || 'N/A'}</td>
                    <td className="desc-cell" title={r.description}>
                      {r.description || '—'}
                    </td>
                    <td>{r.resource_name || 'Unassigned'}</td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Showing {pageRows.length} of {filtered.length} incidents
        </span>
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={n === currentPage ? 'active' : ''}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default IncidentTable
