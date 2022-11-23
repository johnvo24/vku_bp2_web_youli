const express = require('express')
const walletRouter = express.Router()
const controller = require('../controllers/walletController')

walletRouter.post('/inf', controller.getInf)
walletRouter.post('/update', controller.updateBudget)
walletRouter.post('/categories', controller.getCategories)
walletRouter.post('/item/submit', controller.saveBill)

module.exports = walletRouter
