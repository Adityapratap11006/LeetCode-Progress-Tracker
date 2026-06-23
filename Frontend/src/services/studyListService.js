import axios from 'axios'

const API_URL = '/api/studylists'

export const getStudyLists = async () => {
  const { data } = await axios.get(API_URL)
  return data
}

export const getStudyListById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`)
  return data
}

export const createStudyList = async (listData) => {
  const { data } = await axios.post(API_URL, listData)
  return data
}

export const updateStudyList = async (id, listData) => {
  const { data } = await axios.patch(`${API_URL}/${id}`, listData)
  return data
}

export const deleteStudyList = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`)
  return data
}

export const addProblemToList = async (listId, problemId) => {
  const { data } = await axios.post(`${API_URL}/${listId}/problems`, { problemId })
  return data
}

export const removeProblemFromList = async (listId, problemId) => {
  const { data } = await axios.delete(`${API_URL}/${listId}/problems/${problemId}`)
  return data
}
