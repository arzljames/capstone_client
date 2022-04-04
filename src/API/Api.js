import axios from 'axios'

let serverUrl = 'http://localhost:3001'

const api = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})



export default api;