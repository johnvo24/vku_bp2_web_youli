const db = require('../config/db')

class User {
    setUserInformation(username, password, displayName) {
        return new Promise((resolve, reject) => {
            db.query('insert into user(username, userpassword, display_name) values (?,?,?)',
                [username, password, displayName],
                (err, result) => {
                    if (err) reject(err)
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
}

module.exports = User