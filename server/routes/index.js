const auth = require('./Authorization');
const noteBoxRouter = require('./noteBoxRouter');
const noteRouter = require('./noteRouter');
const wallet = require('./Wallet');
const profile = require('./Profile');
const scheduleRouter = require('./ScheduleRouter');
const PORT = 4000;

function routes(app) {

    app.use('/api/authorization', auth);
    app.use('/api/notebox/', noteBoxRouter);
    app.use('/api/note/', noteRouter);
    app.use('/api/wallet', wallet);
    app.use('/api/profile', profile);
    app.use('/api/schedule', scheduleRouter);
    app.listen(PORT);
}

module.exports = routes;