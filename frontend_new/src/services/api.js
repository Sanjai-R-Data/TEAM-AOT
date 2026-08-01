import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000'

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000
})

/**
 * Fetches all incident reports from the backend.
 * Returns an array of report objects. Throws on network/server failure
 * so calling components can handle loading/error state explicitly.
 */
export const fetchReports = async () => {
  const response = await client.get('/reports')
  return Array.isArray(response.data) ? response.data : []
}

/**
 * Triggers a backend sync that loads fresh incidents into PostgreSQL.
 */
export const syncData = async () => {
  const response = await client.post('/sync-data')
  return response.data
}

export default client
