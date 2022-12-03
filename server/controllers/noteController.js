const NoteModel = require("../model/Note");


const noteController = () => {
    const noteController = {};

    noteController.index = async (req, res) => {
        res.send(await NoteModel().getNode(req.params.note_box_id));
    }
    noteController.create = (req, res) => {
        const newNote = req.body;
        NoteModel().creatNote(
            [
                newNote.note_box_id, 
                newNote.note_title, 
                newNote.note_img, 
                newNote.note_description, 
                newNote.note_link
            ]
        );
        res.status(200);
        res.send("Created note successfully");
    }
    noteController.update = (req, res) => {
        NoteModel().updateNote(req.body);
        res.status(200);
        res.send("Update note successfully");
    }
    noteController.updateEdit = (req, res) => {
        NoteModel().updateEditNote(req.body);
        res.status(200);
        res.send("Edited note successfully")
    }
    noteController.updatePriority = (req, res) => {
        const list = req.body;
        list.forEach((item, index) => {
            NoteModel().updatePriority(index, item);
        });
        res.status(200);
        res.send("Updated note successfully");
    }
    noteController.deleteNote= (req, res) => {
        NoteModel().deleteNote(req.params.note_id)
        res.status(200);
        res.send("Deleted note successfully");
    }
    noteController.uploadFile = (req, res) => {
        const data = req.file;
        res.status(200);
        res.send(data.filename);
    }


    return noteController;
}

module.exports = noteController;