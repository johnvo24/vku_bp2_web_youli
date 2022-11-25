const NoteModel = require("../model/Note");


const noteController = () => {
    const noteController = {};

    noteController.index = async (req, res) => {
        res.send(await NoteModel().getNode(req.params.note_box_id));
    }
    noteController.create = (req, res) => {
        const data = req.body;
        const newNote = [
            data.note_box_id,
            data.note_title,
            data.note_img,
            data.note_description,
            data.note_link
        ]
    }
    noteController.update = (req, res) => {
        NoteModel().updateNote(req.body);
        res.status(200);
        res.send("Update note successfully");
    }
    noteController.updatePriority = (req, res) => {
        const list = req.body;
        list.forEach((item, index) => {
            NoteModel().updatePriority(index, item);
        });
        res.status(200);
        res.send("Update note successfully");
    }
    noteController.delete = (req, res) => {
        return false;
    }

    return noteController;
}

module.exports = noteController;