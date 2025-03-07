const NoteBox = require('../model/NoteBox');

const noteBoxController = () => {
    const noteBoxController = {};

    noteBoxController.index = async (req, res) => {
        res.send(await NoteBox().getNoteBox(req.params.user_id));
    }
    noteBoxController.getNoteBox = async (req, res) => {
        res.send(await NoteBox().getNoteBoxById(req.params.note_box_id));
    }
    noteBoxController.create = (req, res) => {
        const data = req.body;
        const newNoteBox = [data.user_id, 
                            data.note_box_title, 
                            data.note_box_description, 
                            data.created_at, 
                            data.updated_at
        ];
        NoteBox().creatNoteBox(newNoteBox);
        res.status(200);
        res.send("Created notebox successfully")
    }
    noteBoxController.update = (req, res) => {
        NoteBox().updateNoteBox(req.body);
        res.status(200);
        res.send("Updated notebox successfully")
    }
    noteBoxController.updateEdit = (req, res) => {
        NoteBox().updateEditNoteBox(req.body);
        res.status(200);
        res.send("Updated notebox successfully")
    }
    noteBoxController.updateLatest = (req, res) => {
        NoteBox().updateLatest(req.body);
        res.status(200);
        res.send("Updated notebox successfully");
    }
    noteBoxController.delete = (req, res) => {
        NoteBox().deleteNoteBox(req.params.note_box_id);
        res.status(200);
        res.send("Deleted notebox successfully")
    }
    noteBoxController.clean = (req, res) => {
        NoteBox().cleanNoteBox();
        res.status(200);
        res.send("Cleaned notebox successfully")
    }
    
    return noteBoxController;
}

module.exports = noteBoxController;