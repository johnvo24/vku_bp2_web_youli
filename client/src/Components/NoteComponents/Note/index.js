import styles from './Note.module.css'
import { noteLang } from '../../../Constants/languages/NoteLanguages';
import { getCurrentUser, timeConverter } from '../../../Middlewares/Middlewares';

function Note({ noteData }) {
    const handleClickNoteTitle = () => {
        const e = document.querySelector(`#note_${noteData.note_id}`).childNodes[1];
        (e.style.display === "block") 
            ? (e.style.display = "none")
            : (e.style.display = "block")
    }

    return (
        <div className={styles.note + " g_item"} id={`note_${noteData.note_id}`}>
            <div className={styles.header}>
                <div className={styles.noteTitle}>
                    <i className={`fa-solid fa-star g_priority_${noteData.priority}`}></i>
                    <span onClick={handleClickNoteTitle}>{noteData.note_title}</span>
                </div>
                <div className={`g_status ${(noteData.status) && "g_success"}`}>
                    <i className="fa-solid fa-check"></i>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.detail}>
                    {noteData.note_img && (
                        <div className={`${styles.img} g_padding`}>
                            <img
                                src={noteData.note_img}
                                alt="Ảnh bị lỗi x<!"
                            ></img>
                        </div>
                    )}
                    {noteData.note_description && (
                        <div className={`${styles.description}`}>
                            <span>{
                                noteLang.description[getCurrentUser('YoleUser').language]
                            }</span>
                            <span>{noteData.note_description}</span>
                        </div>
                    )}
                    <span
                        className={styles.time}
                    >
                        {noteLang.creationDate[getCurrentUser('YoleUser').language]}
                        {" "}
                        {timeConverter(noteData.created_at, "d/m/y h:i:s")}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Note;