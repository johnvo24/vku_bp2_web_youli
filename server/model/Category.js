const db = require('../config/db')

const getDefaultCategory = async () => {
    return await new Promise((resolve, reject) => {
        db.query('select * from categories',
            (err, result) => {
                if (err) reject(err)
                resolve(result) //array
            })
    })
}

const getCustomCategories = async userId => {
    return await new Promise((resolve, reject) => {
        db.query('select * from custom_categories where user_id = ?',
            [userId],
            (err, result) => {
                if (err) reject(err)
                resolve(result) //array
            })
    })
}

const createCustomCategory = async data => {
    return await new Promise((resolve, reject) => {
        db.query('insert into custom_categories(user_id, category_name, type) values (?, ?, ?)',
            [data.user_id, data.category_name, data.type],
            (err, result) => {
                if (err) reject(err)
                resolve()
            })
    })
}

module.exports = {getDefaultCategory, getCustomCategories, createCustomCategory}