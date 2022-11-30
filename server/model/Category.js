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

const getDefaultCategoryById = async cat_id => {
    return await new Promise((resolve, reject) => {
        db.query('select * from categories where category_id = ?',
            [cat_id],
            (err, result) => {
                if (err) reject(err)
                resolve(result[0])
            })
    })
}

const getCustomCategories = async userId => {
    return await new Promise((resolve, reject) => {
        db.query('select * from custom_categories where user_id = ?',
            [userId],
            (err, result) => {
                // if (err) reject(err)
                resolve(result) //array
            })
    })
}

const getCustomCategoryById = async cat_id => {
    return await new Promise((resolve, reject) => {
        db.query('select * from custom_categories where category_id = ?',
            [cat_id],
            (err, result) => {
                if (err) reject(err)
                resolve(result[0])
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

const deleteCategory = async category_id => {
    return await new Promise((resolve, reject) => {
        db.query('delete from custom_categories where category_id = ?',
            [category_id],
            (err, result) => {
                if (err) reject(err)
                resolve()
            })
    })
}

const renameCategory = async (category_id, category_name) => {
    return await new Promise((resolve, reject) => {
        db.query('update custom_categories set category_name = ? where category_id = ?',
            [category_name, category_id],
            (err, result) => {
                if (err) reject(err)
                resolve()
            })
    })
}

module.exports = {
    getDefaultCategory,
    getCustomCategories,
    createCustomCategory,
    getDefaultCategoryById,
    getCustomCategoryById,
    deleteCategory,
    renameCategory
}