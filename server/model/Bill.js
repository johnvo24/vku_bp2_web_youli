const db = require('../config/db')

const saveBill = async data => {
    const query1 = 'insert into bills(wallet_id, category_id, item_title, item_cost, item_description, bill_time)' +
        ' values (?, ?, ?, ?, ?, ?)'
    const query2 = 'insert into bills(wallet_id, c_category_id, item_title, item_cost, item_description, bill_time)' +
        ' values (?, ?, ?, ?, ?, ?)'
    await db.query(data.category_id ? query1 : query2,
        [data.wallet_id, data.category_id ? data.category_id : data.c_category_id, data.item_title, data.item_cost, data.item_description, data.bill_time],
        (err, result) => {
            if (err) throw err
        })
}

const getBills = async walletId => {
    return await new Promise((resolve, reject) => {
        db.query('select bill_id, item_title, item_cost, item_description, bill_time from bills where wallet_id = ?',
            [walletId],
            (err, result) => {
                if (err) reject(err)
                resolve(result) //array
            })
    })
}

module.exports = {saveBill, getBills}