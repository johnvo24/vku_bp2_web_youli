const auth = require('./Authorization');
const noteBoxRouter = require('./noteBoxRouter');
const wallet = require('./Wallet');
const PORT = 4000;

function routes(app) {

    app.use('/api/authorization', auth);
    app.use('/api/notebox', noteBoxRouter);
    app.use('/api/wallet/:id', wallet);
    app.listen(PORT);
}

module.exports = routes;