const express = require('express');
const noteBoxController = require('../controllers/noteBoxController');
const noteBoxRouter = express.Router();

noteBoxRouter.get('/create', noteBoxController().index)

module.exports = noteBoxRouter;