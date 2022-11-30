const express = require('express')
const walletRouter = express.Router()
const controller = require('../controllers/walletController')

walletRouter.post('/inf', controller.getInf)
walletRouter.post('/update', controller.updateBudget)
walletRouter.post('/categories', controller.getCategories)
walletRouter.post('/item/submit', controller.saveBill)
walletRouter.post('/bill', controller.getBills)
walletRouter.post('/category/add', controller.createCustomCategory)
walletRouter.post('/bill/statistic', controller.statistic)
walletRouter.post('/bill/total', controller.totalCost)
walletRouter.post('/bill/delete/refund', controller.deleteBillWithRefund)
walletRouter.post('/bill/delete', controller.deleteBillWithoutRefund)
walletRouter.post('/category/view', controller.getPrivateCategory)
walletRouter.post('/category/delete', controller.deleteCategory)
walletRouter.post('/category/rename', controller.renameCategory)

module.exports = walletRouter
