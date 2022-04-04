import axios from 'axios'


axios.defaults.withCredentials = true;

// https://zcmc.herokuapp.com/

let serverUrl = 'https://zcmc.herokuapp.com/'

const api = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})



export default api;