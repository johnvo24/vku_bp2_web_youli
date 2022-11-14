import { timeConverter } from '../../../Middlewares/Middlewares';
import styles from './NoteBox.module.css';

function NoteBox({ noteBoxData }) {
    const handleClickTitle = () => {
        const e = document.getElementById(`note_box_${noteBoxData.note_box_id}`)
            .children[1].children[0].style;
        (e.display === "none") ? (e.display = "block") : (e.display = "none");
    }

    return (
        <div className={styles.noteBox} id={`note_box_${noteBoxData.note_box_id}`}>
            <div className="g_header">
                <div className="g_title">
                    <i className="fa-solid fa-star"></i>
                    <span style={{cursor:  "pointer"}} onClick={handleClickTitle}>{noteBoxData.note_box_title}</span>
                </div>
                <div className="g_status">
                    <i className="fa-solid fa-check"></i>
                </div>
            </div>
            <div className="g_body">
                <div className="g_description" style={{display: "none"}}>
                    {noteBoxData.note_box_description || "Không có mô tả nào cả!"}
                </div>
            </div>
            <div className="g_footer">
                <div className="g_createdAt">
                    Tạo: { 
                        timeConverter(noteBoxData.created_at, "d/m/y h:i:s")
                    }
                </div>
                <div className="g_updatedAt">
                    Cập nhật: { 
                        timeConverter(noteBoxData.updated_at, "d/m/y h:i:s")
                    }
                </div>
            </div>
        </div>
    )
}

export default NoteBox;