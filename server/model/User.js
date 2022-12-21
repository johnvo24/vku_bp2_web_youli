const db = require('../config/db')

class User {
    async initWallet(username) {
        const id = await new Promise((resolve, reject) => {
            db.query('select user_id from user where username = ?',
                [username],
                async (err, result) => {
                    if (err) reject(err)
                    await db.query('insert into wallet(user_id, budget) values (?, ?)',
                        [result[0]?.user_id, 0],
                        (err, result_) => {
                            if (err) reject(err)
                            resolve()
                        })
                })
        })
    }

    setUserInformation(username, password, displayName, gmail, avatar) {
        return new Promise((resolve, reject) => {
            db.query('insert into user(username, userpassword, display_name, user_email, user_avatar) values (?, ?, ?, ?, ?)',
                [username, password, displayName, gmail, avatar === '' ? 'e23fd0380eea0512487d261d83354c68' : avatar],
                async (err, result) => {
                    if (err) reject(err)
                    const wallet = await this.initWallet(username)
                    resolve()
                })
        })
    }

    getUserInformation(value) {
        return new Promise((resolve, reject) => {
            db.query('select * from user where username = ?',
                [value],
                (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                }
            )
        })
    }

    getUserInformationById(value) {
        return new Promise((resolve, reject) => {
            db.query('select * from user where user_id = ?',
                [value],
                (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                }
            )
        })
    }

    updateUserInf(data, file) {
        return new Promise((resolve, reject) => {
            if (file) {
                db.query('update user set ' +
                    'display_name = ?, user_email = ?, user_phone = ?, user_biography = ?, language = ?' +
                    ', user_avatar = ? ' +
                    'where user_id = ?'
                    , [data.display_name, data.user_email, data.user_phone, data.user_biography, data.language, file.filename, data.user_id],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        }
                        console.log(result)
                        resolve()
                    })
            }
            else {

                db.query('update user set ' +
                    'display_name = ?, user_email = ?, user_phone = ?, user_biography = ?, language = ? ' +
                    'where user_id = ?'
                    , [data.display_name, data.user_email, data.user_phone, data.user_biography, data.language, data.user_id],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        }
                        console.log(result)
                        resolve()
                    })
            }

        })
    }
}

module.exports = User