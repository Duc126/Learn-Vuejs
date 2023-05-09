import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const getJobs = async () => {
  const response = await axios.get(`${baseUrl}/job`)
  return response.data
}
