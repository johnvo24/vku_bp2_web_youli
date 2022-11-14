const db = require("../config/db");


const NoteModel = () => {
    const noteModel = {};

    noteModel.getNode = async (note_box_id) => {
        let noteList = [];
        noteList = await new Promise((resolve, reject) => {
            let sql = "select * from note where note_box_id=?";
            db.query(
                sql, 
                [note_box_id],
                (err, result) => {
                    if(err) reject(err);
                    resolve(result);
                }
            )
        })
        .then((result) => noteList = result)
        .catch((err) => console.log(err))

        return noteList;
    }

    return noteModel;
}

module.exports = NoteModel;