import axios from "axios"

export const AUTH = axios.create({
    baseURL: '/api/authorization'
})

export const WALLET = axios.create({
    baseURL: '/api/wallet'
})

export const NOTEBOX = axios.create({
    baseURL: '/api/notebox'
})
export const NOTE = axios.create({
    baseURL: '/api/note'
})

export const PROFILE = axios.create({
    baseURL: '/api/profile',
    headers: { "Content-Type": "multipart/form-data" }
})