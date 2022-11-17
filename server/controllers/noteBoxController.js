const NoteBox = require('../model/NoteBox');

const noteBoxController = () => {
    const noteBoxController = {};

    noteBoxController.index = async (req, res) => {
        res.send(await NoteBox().getNoteBox(req.params.user_id));
    }
    noteBoxController.create = (req, res) => {
        return false;
    }
    noteBoxController.store = (req, res) => {
        return false;
    }
    noteBoxController.edit = (req, res) => {
        return false;
    }
    noteBoxController.update = (req, res) => {
        NoteBox().updateNoteBox(req.body);
    }
    noteBoxController.delete = (req, res) => {
        return false;
    }
    
    return noteBoxController;
}

module.exports = noteBoxController;