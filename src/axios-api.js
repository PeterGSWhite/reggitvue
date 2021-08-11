import axios from 'axios'

const getAPI = axios.create({
    baseURL: 'https://reggit.herokuapp.com',
    timeout: 1000,
})

export { getAPI }