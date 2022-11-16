import { useEffect, useState } from 'react';
import noteAPI from '../../../api/noteAPI';
import noteBoxAPI from '../../../api/noteBoxAPI';
import { timeConverter } from '../../../Middlewares/Middlewares';
import Note from '../Note';
import styles from './NoteBox.module.css';

function NoteBox({ noteBoxData }) {
    const [noteBoxData1, setNoteBoxData] = useState(noteBoxData)
    const [noteList, setNoteList] = useState([]);

    useEffect(() => {
        noteAPI().getNote(noteBoxData1.note_box_id)
            .then((res) => {
                setNoteList(res.data)
            }).catch((err) => console.log(err))
    }, [noteBoxData1.note_box_id]);

    const handleClickTitle = () => {
        const e = document.getElementById(`note_box_${noteBoxData1.note_box_id}`)
            .children[1].children[0].style;
        (e.display === "none") ? (e.display = "block") : (e.display = "none");
    }
    const handleClickPriority = () => {
        let pri = noteBoxData1.priority;
        if(noteBoxData1.priority === 2) {
            pri = 1;
        }else if(noteBoxData1.priority !== 3) {
            pri = 2;
        }
        if(pri === 3) return;
        const data = {
            note_box_id: noteBoxData1.note_box_id,
            user_id: noteBoxData1.user_id,
            note_box_title: noteBoxData1.note_box_title,
            note_box_description: noteBoxData1.note_box_description,
            created_at: noteBoxData1.created_at,
            updated_at: (timeConverter(new Date(), 'y-m-d h:i:s')),
            status: noteBoxData1.status,
            priority: pri
        }
        noteBoxAPI().update(data);
        setNoteBoxData(data);
    }

    return (
        <div className={styles.noteBox} id={`note_box_${noteBoxData1.note_box_id}`}>
            <div className="g_header">
                <div className="g_title">
                    <i
                        className={`fa-solid fa-star g_boxpriority_${noteBoxData1.priority}`}
                        onClick={handleClickPriority}
                    ></i>
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={handleClickTitle}
                    >{noteBoxData1.note_box_title}</span>
                </div>
                <div className={`g_status ${(noteBoxData1.status === 1) && "g_success"}`}>
                    <i className="fa-solid fa-check"></i>
                </div>
            </div>
            <div className="g_body">
                <div className="g_description" style={{ display: "none" }}>
                    {noteBoxData1.note_box_description || "Không có mô tả nào cả!"}
                </div>
                <div className={styles.NoteList}>
                    {noteList.map((note) => (
                        <Note
                            key={note.note_id}
                            noteData={note}
                        />
                    ))}
                </div>
            </div>
            <div className="g_footer">
                <div className="g_createdAt">
                    Tạo: {
                        timeConverter(noteBoxData1.created_at, "d/m/y h:i:s")
                    }
                </div>
                <div className="g_updatedAt">
                    Cập nhật: {
                        timeConverter(noteBoxData1.updated_at, "d/m/y h:i:s")
                    }
                </div>
            </div>
        </div>
    )
}

export default NoteBox;