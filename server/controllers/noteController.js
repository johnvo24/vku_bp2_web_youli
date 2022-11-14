

const noteController = () => {
    const noteController = {};

    noteController.index = async (req, res) => {
        console.log(req.params);
        res.send(await NoteBox().getNoteBox(req.params.user_id));
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