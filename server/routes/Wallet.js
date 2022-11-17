const express = require('express')
const walletRouter = express.Router()
const controller = require('../controllers/walletController')

walletRouter.post('/inf', controller.getInf)
// walletRouter.post('/')

module.exports = walletRouter
