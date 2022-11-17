const wallet = require('../model/Wallet')

async function getInf(req, res) {
    console.log(req.body)
    await wallet.getInf(req.body.user_id)
        .then(response => {
            res.status(200)
            res.send(response)
        })
}

module.exports = {getInf}