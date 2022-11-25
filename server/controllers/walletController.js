const wallet = require('../model/Wallet')
const category = require('../model/Category')
const bill = require('../model/Bill')

async function getInf(req, res) {
    await wallet.getInf(req.body.user_id)
        .then(response => {
            res.status(200)
            res.send(response)
        })
}

async function updateBudget(req, res) {
    await wallet.updateBudget(req.body.wallet_id, req.body.budget)
        .then(response => {
            res.status(200)
            res.send('Saved')
        })
        .catch(() => {
            res.status(502)
            res.send('Oops, There are some error occurred, Please try again later')
        })
}

async function getCategories(req, res) {
    let defaultList = await category.getDefaultCategory()
    const customList = await category.getCustomCategories(req.body.user_id)
    defaultList = defaultList.concat(customList)
    res.status(200)
    res.send(defaultList)
}

async function saveBill(req, res) {
    const save = await bill.saveBill(req.body)
        .then(() => {
            res.status(200)
            res.send()
        })
}

async function getBills(req, res) {
    const list = await bill.getBills(req.body.wallet_id)
        .then(response => {
            res.status(200)
            console.log(response)
            res.send(response)
        })
        .catch(err => {
            res.status(501)
            res.send('Oops, There are some error occurred, Please try again later')
        })
}

module.exports = {
    getInf,
    updateBudget,
    getCategories,
    saveBill,
    getBills
}