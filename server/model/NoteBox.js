const db = require('../config/db');

const NoteBoxModel = () => {
    const noteBoxModel = {};

    noteBoxModel.getNoteBox = async (user_id) => {
        let noteBoxList = [];
        noteBoxList = await new Promise((resolve, reject) => {
            let sql = 'select * from note_box where user_id = ? order by priority ASC';
            db.query(
                sql,
                [user_id],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            )
        })
            .then((result) => noteBoxList = result)
            .catch((err) => console.log(err));
        return noteBoxList;
    }
    noteBoxModel.creatNoteBox = async (user_id) => {
        const noteboxs = [
            [
                user_id,
                "Hello1",
                "Okie không sao"
            ],
            [
                user_id,
                "Hello2",
                "Okie không sao"
            ]
        ]
        let sql = 'insert into note_box (user_id, note_box_title, note_box_description) values ?';
        await db.query(
            sql,
            [noteboxs],
            (err, result) => {
                if (err) throw err;
                console.log(result);
            }
        )
    }
    noteBoxModel.updateNoteBox = (data) => {
        let sql = 'update note_box set user_id=?, note_box_title=?, note_box_description=?, updated_at=?, status=?, priority=? where note_box_id=?';
        db.query(
            sql,
            [
                data.user_id,
                data.note_box_title,
                data.note_box_description,
                data.updated_at,
                data.status,
                data.priority,
                data.note_box_id
            ],
            (err, result) => {
                if(err) throw err;
            }
        )
    }

    return noteBoxModel;
}


module.exports = NoteBoxModel;