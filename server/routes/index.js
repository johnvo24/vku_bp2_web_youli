const PORT = 4000
const auth = require('./Authorization')
const noteBoxRouter = require('./noteBoxRouter')

function routes(app) {

    app.use('/api/authorization', auth)
    app.use('/api/notebox', noteBoxRouter)
    app.listen(PORT)
}

module.exports = routes;