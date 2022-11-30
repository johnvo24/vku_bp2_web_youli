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

async function getPrivateCategory(req, res) {
    const list = await category.getCustomCategories(req.body.user_id)
        .then(response => {
            res.status(200)
            res.send(response)
        })
        .catch(err => {
            res.status(502)
            res.send('Oops, There are some error occurred, Please try again later')
        })
}

calc = async (response, user_id, wallet_id, value) => {
    const getWallet = await wallet.getInf(user_id)
    if (response.type === 'cost')
        wallet.updateBudget(wallet_id, getWallet.budget - value).then()
    else
        wallet.updateBudget(wallet_id, getWallet.budget + value).then()
}

reCalc = async (response, user_id, wallet_id, value) => {
    const getWallet = await wallet.getInf(user_id)
    if (response.type === 'cost')
        wallet.updateBudget(wallet_id, getWallet.budget + value).then()
    else
        wallet.updateBudget(wallet_id, getWallet.budget - value).then()
}

async function saveBill(req, res) {
    if (req.body.bill_time === '' || req.body.item_cost === '' || req.body.item_description === '' || req.body.item_title === '') {
        res.status(500)
        res.send('Empty Input Is Not Allowed!')
    } else {
        const save = await bill.saveBill(req.body)
            .then()
        if (req.body.category_id)
            await category.getDefaultCategoryById(req.body.category_id)
                .then(response => {
                    calc(response, req.body.user_id, req.body.wallet_id, Number(req.body.item_cost))
                })
        else
            await category.getCustomCategoryById(req.body.c_category_id)
                .then(response => {
                    calc(response, req.body.user_id, req.body.wallet_id, Number(req.body.item_cost))
                })
        res.status(200)
        res.send()
    }
}

async function deleteBillWithoutRefund(req, res) {
    const deleted = await bill.deleteBill(req.body.bill_id)
        .then(() => {
            res.status(200)
            res.send()
        })
        .catch(err => {
            res.status(502)
            res.send('Oops, There are some error occurred, Please try again later')
        })
}

async function deleteBillWithRefund(req, res) {
    if (req.body.category_id)
        category.getDefaultCategoryById(req.body.category_id)
            .then(response => {
                reCalc(response, req.body.user_id, req.body.wallet_id, Number(req.body.item_cost))
            })
    else
        category.getCustomCategoryById(req.body.c_category_id)
            .then(response => {
                reCalc(response, req.body.user_id, req.body.wallet_id, Number(req.body.item_cost))
            })
    const deleted = await bill.deleteBill(req.body.bill_id)
        .then(() => {
            res.status(200)
            res.send()
        })
        .catch(err => {
            res.status(502)
            res.send('Oops, There are some error occurred, Please try again later')
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
    if (req.body.type === '' || req.body.category_name === '') {
        res.status(500)
        res.send('Empty Input is not allowed')
    } else {
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
            for (let i = 0; i < response.length; ++i) {
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

async function deleteCategory(req, res) {
    const deleted = await category.deleteCategory(req.body.category_id)
        .then(response => {
            res.status(200)
            res.send()
        })
        .catch(err => {
            res.status(500)
            res.send('Oops, There are some error occurred, Please try again later')
        })
}

async function renameCategory(req, res) {
    const rename = await category.renameCategory(req.body.category_id, req.body.category_name)
        .then(response => {
            res.status(200)
            res.send()
        })
        .catch(err => {
            res.status(500)
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
    totalCost,
    deleteBillWithoutRefund,
    deleteBillWithRefund,
    getPrivateCategory,
    deleteCategory,
    renameCategory
}