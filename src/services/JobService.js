import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const getJobs = async () => {
  const response = await axios.get(`${baseUrl}/job`)
  return response.data
}
export const jobId = async (id) => {
  const response = await axios.get(`${baseUrl}/job/${id}`)
  return response.data
}
export const addJob = async (jobData) => {
  const response = await axios.post(`${baseUrl}/job`, jobData)
  return response.data
}
export const deleteJob = async (jobId) => {
  const response = await axios.delete(`${baseUrl}/job/${jobId}`)
  return response.data
}
export const updateJob = async (jobId, jobData) => {
  const response = await axios.put(`${baseUrl}/job/${jobId}`, jobData)
  return response.data
}
