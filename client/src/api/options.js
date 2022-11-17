import axios from "axios"

export const AUTH = axios.create({
    baseURL: '/api/authorization'
})
<<<<<<< HEAD

export const WALLET = axios.create({
    baseURL: '/api/wallet'
=======
export const NOTEBOX = axios.create({
    baseURL: '/api/notebox'
>>>>>>> afd4438969bba1a5b361e87f93c67507c264eba4
})
