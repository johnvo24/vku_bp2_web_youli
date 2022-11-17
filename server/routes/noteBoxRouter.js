const express = require('express');
const noteBoxController = require('../controllers/noteBoxController');
const noteBoxRouter = express.Router();

noteBoxRouter.get('/index/:user_id', noteBoxController().index)

module.exports = noteBoxRouter;