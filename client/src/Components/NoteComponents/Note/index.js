import styles from './Note.module.css'
import { noteLang } from '../../../Constants/languages/NoteLanguages';
import { getCurrentUser, getLanguage, timeConverter } from '../../../Middlewares/Middlewares';
import noteAPI from '../../../api/noteAPI';
import { useContext } from 'react';
import { NotePageContext } from '../../../Pages/NotePage';
import BtnEditChild from '../../Pieces/Buttons/BtnEditChild';
import BtnDeleteChild from '../../Pieces/Buttons/BtnDeleteChild';

function Note({ noteData, handleMouseDown }) {
    const varNotePage = useContext(NotePageContext);

    const handleClickNoteTitle = () => {
        const e = document.querySelector(`#note_${noteData.note_id}`).childNodes[1];
        (e.style.display === "block")
            ? (e.style.display = "none")
            : (e.style.display = "block")
    }
    const handleClickNoteStatus = () => {
        const stt = (!noteData.status) ? 1 : 0;
        const data = {};
        data.note_id = noteData.note_id;
        data.note_box_id = noteData.note_box_id;
        data.note_title = noteData.note_title;
        data.note_img = noteData.note_img;
        data.note_description = noteData.note_description;
        data.note_link = noteData.note_link;
        data.created_at = noteData.created_at;
        data.status = stt;
        data.priority = noteData.priority;
        noteAPI().update(data);

        varNotePage.reSetNoteBoxList();
    }
    const handleClickBtnEditChild = (e) => {
        e.preventDefault();

        varNotePage.setCurrentNote(noteData);
        varNotePage.setEditNote(true);
        varNotePage.setDetailNote(true);
    }
    const handleClickBtnDeleteChild = (e) => {
        e.preventDefault();

        varNotePage.setCurrentNote(noteData);
        varNotePage.setDeleteFunction("delete-note");
        varNotePage.setConfirmDialog(true);
    }

    return (
        <div className={styles.note + " g_item"} id={`note_${noteData.note_id}`}>
            <div className={styles.header}>
                <div className={styles.noteTitle}>
                    <i
                        className={`fa-sharp fa-solid fa-bars g_status_${noteData.status}`}
                        onMouseDown={(e) => handleMouseDown(e)}
                    ></i>
                    <span onClick={handleClickNoteTitle}>{noteData.note_title}</span>
                </div>
                {
                    (varNotePage.editMode)
                        ? (
                            <div className='g_d_flex'>
                                <BtnEditChild
                                    handleClickBtnEditChild={handleClickBtnEditChild}
                                />
                                <span className='g_m_l1'></span>
                                <BtnDeleteChild
                                    handleClickBtnDeleteChild={handleClickBtnDeleteChild}
                                />
                            </div>
                        )
                        : (<div className={`g_status ${(noteData.status) && "g_success"}`}>
                            <i
                                className="fa-solid fa-check"
                                onClick={handleClickNoteStatus}
                            ></i>
                        </div>)
                }
            </div>
            <div className={styles.body}>
                <div className={styles.detail}>
                    {noteData.note_img && (
                        <div className={`${styles.img} g_padding`}>
                            <img
                                src={"/resources/uploads/" + noteData.note_img}
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
                    {noteData.note_link && (
                        <div className={`${styles.link}`}>
                            <span>{
                                noteLang.link[getLanguage('YoleUser')]
                            }</span>
                            <a href={noteData.note_link} target="_blank">{noteData.note_link}</a>
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
            <div id={noteData.note_id}></div>
        </div>
    )
}

export default Note;