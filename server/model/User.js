const db = require('../config/db')

class User {
    getUserInformation(name, value) {
        return new Promise((resolve, reject) => {
                db.query('select * from user where ? = ?',
                    [name, value],
                    (err, result) => {
                        if (err)  reject(err)
                        resolve(result)
                    }
                )
            }
        )
    }
}

module.exports = User