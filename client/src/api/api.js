import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API || 'http://localhost:8000/api',
})

export default api