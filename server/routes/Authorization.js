const express = require('express')
const authRouter = express.Router()
const getUser = require("../controllers/authController");

authRouter.post('/sign-in', getUser)
// authRouter.post('/sign-up', )

module.exports = authRouter
