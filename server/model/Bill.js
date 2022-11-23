const db = require('../config/db')

const saveBill = async data => {
    await db.query('insert into bills(wallet_id, category_id, item_title, item_cost, item_description, bill_time)' +
        ' values (?, ?, ?, ?, ?, ?)',
        [data.wallet_id, data.category_id, data.item_title, data.item_cost, data.item_description, data.bill_time],
        (err, result) => {
            if(err) throw err
        })
}

module.exports = {saveBill}