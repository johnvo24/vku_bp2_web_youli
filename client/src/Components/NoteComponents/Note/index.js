import styles from './Note.module.css'
import { noteLang } from '../../../Constants/languages/NoteLanguages';
import { getCurrentUser, timeConverter } from '../../../Middlewares/Middlewares';
import noteAPI from '../../../api/noteAPI';
import { useContext, useState } from 'react';
import { NotePageContext } from '../../../Pages/NotePage';
import BtnEditChild from '../../Pieces/Buttons/BtnEditChild';

function Note({ noteData, handleReRenderNoteBoxList, handleReRenderNoteBox, handleMouseDown }) {
    const varNotePage = useContext(NotePageContext);
    const [noteData1, setNoteData1] = useState(noteData);

    const handleClickNoteTitle = () => {
        const e = document.querySelector(`#note_${noteData1.note_id}`).childNodes[1];
        (e.style.display === "block")
            ? (e.style.display = "none")
            : (e.style.display = "block")
    }
    const handleClickNoteStatus = () => {
        const stt = (!noteData1.status) ? 1 : 0;
        const data = {};
        data.note_id = noteData1.note_id;
        data.note_box_id = noteData1.note_box_id;
        data.note_title = noteData1.note_title;
        data.note_img = noteData1.note_img;
        data.note_description = noteData1.note_description;
        data.note_link = noteData1.note_link;
        data.created_at = noteData1.created_at;
        data.status = stt;
        data.priority = noteData1.priority;
        noteAPI().update(data);
        setNoteData1(data);
        handleReRenderNoteBox();
        handleReRenderNoteBoxList();
    }
    const handleClickBtnEditChild = (e) => {
        e.preventDefault();
        console.log("edit note");
    }
    return (
        <div className={styles.note + " g_item"} id={`note_${noteData1.note_id}`}>
            <div className={styles.header}>
                <div className={styles.noteTitle}>
                    <i
                        className={`fa-sharp fa-solid fa-bars g_status_${noteData1.status}`}
                        onMouseDown={(e) => handleMouseDown(e)}
                    ></i>
                    <span onClick={handleClickNoteTitle}>{noteData1.note_title}</span>
                </div>
                {
                    (varNotePage.editMode)
                        ? (<BtnEditChild
                            handleClickBtnEditChild={handleClickBtnEditChild}
                        />)
                        : (<div className={`g_status ${(noteData1.status) && "g_success"}`}>
                            <i
                                className="fa-solid fa-check"
                                onClick={handleClickNoteStatus}
                            ></i>
                        </div>)
                }
            </div>
            <div className={styles.body}>
                <div className={styles.detail}>
                    {noteData1.note_img && (
                        <div className={`${styles.img} g_padding`}>
                            <img
                                src={"/resources/uploads/"+ noteData1.note_img}
                                alt="Ảnh bị lỗi x<!"
                            ></img>
                        </div>
                    )}
                    {noteData1.note_description && (
                        <div className={`${styles.description}`}>
                            <span>{
                                noteLang.description[getCurrentUser('YoleUser').language]
                            }</span>
                            <span>{noteData1.note_description}</span>
                        </div>
                    )}
                    <span
                        className={styles.time}
                    >
                        {noteLang.creationDate[getCurrentUser('YoleUser').language]}
                        {" "}
                        {timeConverter(noteData1.created_at, "d/m/y h:i:s")}
                    </span>
                </div>
            </div>
            <div id={noteData1.note_id}></div>
        </div>
    )
}

export default Note;