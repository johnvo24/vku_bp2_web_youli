const express = require('express')
const authRouter = express.Router()
const {getUser, setUser} = require("../controllers/authController");

authRouter.post('/sign-in', getUser)
authRouter.post('/sign-up', setUser)

module.exports = authRouter
