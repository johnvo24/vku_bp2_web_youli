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

    return await new Promise(async (resolve, reject) => {
        let array = []

        await db.query('select bill_id, categories.category_name, categories.type, item_title, item_cost, item_description, bill_time ' +
            'from bills inner join categories on bills.category_id = categories.category_id where wallet_id = ?',
            [walletId],
            (err, result) => {
                if (err) reject(err)
                for (let i = 0; i < result.length; ++i)
                    array.push(result[i])
            })

        await db.query('select bill_id, custom_categories.category_name, custom_categories.type, item_title, item_cost, item_description, bill_time ' +
            'from (bills inner join custom_categories on bills.c_category_id = custom_categories.category_id) where wallet_id = ?',
            [walletId],
            (err, result) => {
                if (err) reject(err)
                for (let i = 0; i < result.length; ++i)
                    array.push(result[i])
                resolve(array)
            })

    })
}

const statistic = async wallet_id => {

    return await new Promise(async (resolve, reject) => {
        let array = []

        await db.query('SELECT item_cost, bill_time, custom_categories.type ' +
            'FROM bills inner join custom_categories on c_category_id = custom_categories.category_id ' +
            'where wallet_id = ? ORDER BY bill_time ASC',
            [wallet_id],
            (err, result) => {
                if (err) reject(err)
                for (let i = 0; i < result.length; ++i)
                    array.push(result[i])
            })

        await db.query('SELECT item_cost, bill_time, categories.type ' +
            'FROM bills inner join categories on bills.category_id = categories.category_id ' +
            'where wallet_id = ? ORDER BY bill_time ASC',
            [wallet_id],
            (err, result) => {
                if (err) reject(err)
                for (let i = 0; i < result.length; ++i)
                    array.push(result[i])
                resolve(array)
            })
    })
}

const totalCost = async wallet_id => {
    return await new Promise(async (resolve, reject) => {
        let array = []

        await db.query('SELECT item_cost ' +
            'FROM bills inner join custom_categories on c_category_id = custom_categories.category_id ' +
            'where wallet_id = ? and custom_categories.type = ?',
            [wallet_id, 'cost'],
            (err, result) => {
                if (err) reject(err)
                for (let i = 0; i < result.length; ++i)
                    array.push(result[i])
            })

        await db.query('SELECT item_cost ' +
            'FROM bills inner join categories on bills.category_id = categories.category_id ' +
            'where wallet_id = ? and categories.type = ?',
            [wallet_id, 'cost'],
            (err, result) => {
                if (err) reject(err)
                for (let i = 0; i < result.length; ++i)
                    array.push(result[i])
                resolve(array)
            })
    })
}


module.exports = {saveBill, getBills, statistic, totalCost}