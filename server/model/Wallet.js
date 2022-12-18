const db = require('../config/db')

async function getInf(userId) {
    return await new Promise((resolve, reject) => {
        db.query('select * from wallet where user_id = ?',
            [userId],
            (err, result) => {
                if (err) reject(err)
                resolve(result[0])
            })
    })
}

async function updateBudget(walletId, value) {
    await new Promise((resolve, reject) => {
        db.query('update wallet set budget = ? where wallet_id = ?',
            [value, walletId],
            (err, result) => {
                if (err) reject(err)
                resolve()
            })
    })
}

async function updateMileStone(walletId, value) {
    await new Promise((resolve, reject) => {
        db.query('update wallet set milestone = ? where wallet_id = ?',
            [value, walletId],
            (err, result) => {
                if(err) reject(err)
                resolve()
            })
    })
}

module.exports = {
    getInf,
    updateBudget,
    updateMileStone
}