const NoteBox = require('../model/NoteBox');

const noteBoxController = () => {
    const noteBoxController = {};

    noteBoxController.index = async (req, res) => {
        user_id = 1;
        res.send(await NoteBox().getNoteBox(user_id));
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
        return false;
    }
    noteBoxController.delete = (req, res) => {
        return false;
    }
    
    return noteBoxController;
}

module.exports = noteBoxController;