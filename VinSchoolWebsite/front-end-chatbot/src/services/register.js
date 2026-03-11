import axios from "axios";

const baseUrl = '/api/users'

const register = async (credentials) => {
    const result = await axios.post(baseUrl, credentials)
    return result.data
}

export default {register}