const NoteModel = require("../model/Note");


const noteController = () => {
    const noteController = {};

    noteController.index = async (req, res) => {
        res.send(await NoteModel().getNode(req.params.note_box_id));
    }
    noteController.create = (req, res) => {
        return false;
    }
    noteController.store = (req, res) => {
        return false;
    }
    noteController.edit = (req, res) => {
        return false;
    }
    noteController.update = (req, res) => {
        return false;
    }
    noteController.delete = (req, res) => {
        return false;
    }

    return noteController;
}

module.exports = noteController;