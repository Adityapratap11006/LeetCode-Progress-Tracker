import axios from 'axios'

const API_URL = '/api/problems'

export const getProblems = async (params = {}) => {
  const { data } = await axios.get(API_URL, { params })
  return data
}

export const getProblem = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`)
  return data
}

export const createProblem = async (problem) => {
  const { data } = await axios.post(API_URL, problem)
  return data
}

export const updateProblem = async (id, updates) => {
  const { data } = await axios.patch(`${API_URL}/${id}`, updates)
  return data
}

export const deleteProblem = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`)
  return data
}

export const getStats = async () => {
  const { data } = await axios.get(`${API_URL}/stats`)
  return data
}

export const getStreak = async () => {
  const { data } = await axios.get(`${API_URL}/streak`)
  return data
}

export const getHeatmap = async () => {
  const { data } = await axios.get(`${API_URL}/heatmap`)
  return data
}
