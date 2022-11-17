const db = require('../config/db')

async function getInf(userId) {
    return await new Promise((resolve, reject) => {
        db.query('select * from wallet where user_id = ?',
            [userId],
            (err, result) => {
                if(err) reject(err)
                resolve(result[0])
            })
    })
}

module.exports = {getInf}