import axios from "axios"

export const AUTH = axios.create({
    baseURL: '/api/auth'
})
export const NOTEBOX = axios.create({
    baseURL: '/api/notebox'
})
