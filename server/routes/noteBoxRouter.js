const express = require('express');
const noteBoxController = require('../controllers/noteBoxController');
const noteBoxRouter = express.Router();

noteBoxRouter.get('/index/:user_id', noteBoxController().index)
noteBoxRouter.get('/get_note_box/:note_box_id', noteBoxController().getNoteBox)
noteBoxRouter.post('/create', noteBoxController().create);
noteBoxRouter.post('/update', noteBoxController().update);
noteBoxRouter.post('/update_edit', noteBoxController().updateEdit);
noteBoxRouter.post('/update_latest', noteBoxController().updateLatest);
noteBoxRouter.delete('/delete/:note_box_id', noteBoxController().delete)
noteBoxRouter.delete('/clean', noteBoxController().clean)

module.exports = noteBoxRouter;