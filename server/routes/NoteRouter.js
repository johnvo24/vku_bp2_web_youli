const express = require('express');
const noteController = require('../controllers/noteController');
const noteRouter = express.Router();

noteRouter.get('/index/:note_box_id', noteController().index);

module.exports = noteRouter;