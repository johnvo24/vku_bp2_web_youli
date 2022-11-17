const { response } = require('express');
const db = require('../config/db');

const NoteBoxModel = () => {
    const noteBoxModel = [];

    noteBoxModel.getNoteBox = async (user_id) => {
        let noteBoxList = [];
        noteBoxList = await new Promise((resolve, reject) => {
            let sql = 'select * from note_box where user_id = ?';
            db.query(
                sql,
                [user_id],
                (err, result) => {
                    if(err) reject(err);
                    resolve(result);
                }
            )
        })
        .then((response) => noteBoxList = response)
        .catch((err) => console.log(err));
        return noteBoxList;
    }
    return noteBoxModel;
}

module.exports = NoteBoxModel;