const express = require('express');
const noteController = require('../controllers/noteController');
const noteRouter = express.Router();

noteRouter.get('/index/:note_box_id', noteController().index);
noteRouter.post('/create', noteController().create);
noteRouter.post('/update', noteController().update);
noteRouter.post('/update-priority', noteController().updatePriority);

module.exports = noteRouter;