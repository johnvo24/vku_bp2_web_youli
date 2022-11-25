const db = require("../config/db");


const NoteModel = () => {
    const noteModel = {};

    noteModel.getNode = async (note_box_id) => {
        let noteList = [];
        noteList = await new Promise((resolve, reject) => {
            let sql = "select * from note where note_box_id=? order by status ASC, priority ASC";
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
    noteModel.creatNote = (newNote) => {
        let sql = 'insert into note (note_box_id, note_title, note_img, note_description, note_link) values ?';
        db.query(
            sql,
            [newNote],
            (err, result) => {
                if (err) throw err;
            }
        )
    }
    noteModel.updateNote = (data) => {
        let sql = 'update note set note_box_id=?, note_title=?, note_img=?, note_description=?, note_link=?, created_at=?, status=?, priority=? where note_id=?';
        db.query(
            sql,
            [
                data.note_box_id,
                data.note_title,
                data.note_img,
                data.note_description,
                data.note_link,
                data.created_at,
                data.status,
                data.priority,
                data.note_id
            ],
            (err, result) => {
                if(err) throw err;
            }
        )
    }
    noteModel.updatePriority = (priority, note_id) => {
        let sql = 'update note set priority=? where note_id=?';
        db.query(
            sql,
            [
                priority,
                note_id
            ],
            (err, result) => {
                if(err) throw err;
            }
        );
    }

    return noteModel;
}

module.exports = NoteModel;