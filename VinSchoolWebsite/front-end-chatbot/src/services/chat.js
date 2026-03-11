import axios from "axios"

const baseUrl = "/api/chat"

const sendMessage = async (message, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.post(
    baseUrl,
    { message },
    config
  )

  return response.data
}

export default { sendMessage }