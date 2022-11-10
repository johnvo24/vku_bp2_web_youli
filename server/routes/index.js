const PORT = 4000
const auth = require('./Authorization')

function routes(app) {

    app.use('/api/authorization', auth)
    app.listen(PORT)
}

module.exports = routes