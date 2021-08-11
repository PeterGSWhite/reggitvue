import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'https://reggit.herokuapp.com:8000',
    timeout: 1000,
})

export { getAPI }