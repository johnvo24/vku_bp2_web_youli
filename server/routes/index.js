const PORT = 4000
const auth = require('./Authorization')
const wallet = require('./Wallet')

function routes(app) {

    app.use('/api/authorization', auth)
    app.use('/api/wallet/:id', wallet)
    app.listen(PORT)
}

module.exports = routes