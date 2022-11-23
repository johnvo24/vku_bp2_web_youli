const wallet = require('../model/Wallet')
const category = require('../model/Category')

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

module.exports = {
    getInf,
    updateBudget,
    getCategories
}