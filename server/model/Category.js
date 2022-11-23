const db = require('../config/db')

const getDefaultCategory = async () => {
    return await new Promise((resolve, reject) => {
        db.query('select category_name, type from categories',
            (err, result) => {
                if (err) reject(err)
                resolve(result) //array
            })
    })
}

const getCustomCategories = async userId => {
    return await new Promise((resolve, reject) => {
        db.query('select category_name, type from custom_categories where user_id = ?',
            [userId],
            (err, result) => {
                if (err) reject(err)
                resolve(result) //array
            })
    })
}

module.exports = {getDefaultCategory, getCustomCategories}