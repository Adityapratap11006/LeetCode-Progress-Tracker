import axios from 'axios'

const API_URL = '/api/auth'

export const register = async ({ username, email, password }) => {
  const { data } = await axios.post(`${API_URL}/register`, { username, email, password })
  return data
}

export const login = async ({ email, password }) => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password })
  return data
}

export const getProfile = async () => {
  const { data } = await axios.get(`${API_URL}/profile`)
  return data
}
