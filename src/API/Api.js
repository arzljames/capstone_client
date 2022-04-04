import axios from 'axios'

let serverUrl = 'https://zcmc.herokuapp.com/'

const api = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})



export default api;