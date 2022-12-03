const express = require('express');
const multer = require('multer');
const noteController = require('../controllers/noteController');
const noteRouter = express.Router();

const upload = multer({dest: "../client/public/resources/uploads/"});

noteRouter.get('/index/:note_box_id', noteController().index);
noteRouter.post('/create', noteController().create);
noteRouter.post('/update', noteController().update);
noteRouter.post('/update-priority',  noteController().updatePriority);
noteRouter.post('/upload-file', upload.single('upload_file'), noteController().uploadFile)
noteRouter.delete('/delete/:note_id',  noteController().deleteNote);

module.exports = noteRouter;