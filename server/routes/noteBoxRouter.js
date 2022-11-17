const express = require('express');
const noteBoxController = require('../controllers/noteBoxController');
const noteBoxRouter = express.Router();

noteBoxRouter.get('/index/:user_id', noteBoxController().index)
noteBoxRouter.post('/update', noteBoxController().update)

module.exports = noteBoxRouter;