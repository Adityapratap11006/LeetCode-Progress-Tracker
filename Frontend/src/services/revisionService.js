import axios from 'axios'

const API_URL = '/api/revisions'

export const getDueRevisions = async () => {
  const { data } = await axios.get(`${API_URL}/due`)
  return data
}

export const getRevisionStats = async () => {
  const { data } = await axios.get(`${API_URL}/stats`)
  return data
}

export const completeRevision = async (id) => {
  const { data } = await axios.patch(`${API_URL}/${id}`)
  return data
}
