const db = require('../config/db');

const NoteBoxModel = () => {
    const noteBoxModel = {};

    noteBoxModel.getNoteBox = async (user_id) => {
        let noteBoxList = [];
        noteBoxList = await new Promise((resolve, reject) => {
            let sql = 'select * from note_box where user_id = ? order by status ASC, priority ASC';
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
    noteBoxModel.creatNoteBox = (newnoteBox) => {
        let sql = 'insert into note_box (user_id, note_box_title, note_box_description) values ?';
        db.query(
            sql,
            [[newnoteBox]],
            (err, result) => {
                if (err) throw err;
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
    noteBoxModel.cleanNoteBox = () => {
        let sql = 'delete from note_box where status = 1';
        db.query(
            sql,
            [],
            (err, result) => {
                if(err) throw err;
            }
        )
    }

    return noteBoxModel;
}


module.exports = NoteBoxModel;