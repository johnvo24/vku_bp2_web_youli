import axios from "axios"

export const AUTH = axios.create({
    baseURL: '/api/authorization'
})
