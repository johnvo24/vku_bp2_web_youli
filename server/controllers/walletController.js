const wallet = require('../model/Wallet')

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
            res.send('Opppss, There are some error occurred, Please try again later')
        })
}

module.exports = {
    getInf,
    updateBudget
}