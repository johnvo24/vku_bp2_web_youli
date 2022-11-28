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

calc = async (response, user_id, wallet_id, value) => {
    const getWallet = await wallet.getInf(user_id)
    console.log(response.type)
    if(response.type === 'cost')
        wallet.updateBudget(wallet_id, getWallet.budget - value).then()
    else
        wallet.updateBudget(wallet_id, getWallet.budget + value).then()
}

async function saveBill(req, res) {
    const save = await bill.saveBill(req.body)
        .then()
    if(req.body.category_id)
        category.getDefaultCategoryById(req.body.category_id)
            .then(response => {
                console.log(response)
                calc(response, req.body.user_id, req.body.wallet_id, Number(req.body.item_cost))
            })
    else
        category.getCustomCategoryById(req.body.c_category_id)
            .then(response => {
                calc(response, req.body.user_id, req.body.wallet_id, Number(req.body.item_cost))
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

async function createCustomCategory(req, res) {
    const add = await category.createCustomCategory(req.body)
        .then(response => {
            res.status(200)
            console.log(response)
            res.send('Added')
        })
        .catch(err => {
            res.status(501)
            res.send('Oops, There are some error occurred, Please try again later')
        })
}

async function statistic(req, res) {
    const statistic = await bill.statistic(req.body.wallet_id)
        .then(response => {
            res.status(200)
            res.send(response)
        })
        .catch(err => {
            res.status(501)
            res.send('Oops, There are some error occurred, Please try again later')
        })
}

async function totalCost(req, res) {
    const cost = await bill.totalCost(req.body.wallet_id)
        .then(response => {
            let sum = 0;
            for(let i = 0; i < response.length; ++i) {
                sum += response[i].item_cost
            }
            console.log(sum)
            res.status(200)
            res.send({total: sum})
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
    getBills,
    createCustomCategory,
    statistic,
    totalCost
}