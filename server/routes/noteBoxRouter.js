const express = require('express');
const noteBoxController = require('../controllers/noteBoxController');
const noteBoxRouter = express.Router();

noteBoxRouter.get('/index/:user_id', noteBoxController().index)
noteBoxRouter.post('/create', noteBoxController().create);
noteBoxRouter.post('/update', noteBoxController().update)
noteBoxRouter.delete('/clean', noteBoxController().clean)

module.exports = noteBoxRouter;