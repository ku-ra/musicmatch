import axios from 'axios'

const Client = axios.create({
    baseURL: 'https://locahost:3000/',
    timeout: 1000,
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    withCredentials: true
})

export default Client;