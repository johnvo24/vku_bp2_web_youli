import { useContext, useEffect, useState } from 'react';
import noteAPI from '../../../api/noteAPI';
import noteBoxAPI from '../../../api/noteBoxAPI';
import { noteLang } from '../../../Constants/languages/NoteLanguages';
import { getLanguage, timeConverter } from '../../../Middlewares/Middlewares';
import { NotePageContext } from '../../../Pages/NotePage';
import BtnDeleteChild from '../../Pieces/Buttons/BtnDeleteChild';
import BtnEditChild from '../../Pieces/Buttons/BtnEditChild';
import Note from '../Note';
import { action } from './action';
import styles from './NoteBox.module.css';

function NoteBox({ noteBoxData }) {
    const varNotePage = useContext(NotePageContext);
    const [noteList, setNoteList] = useState([]);

    useEffect(() => {
        noteAPI().getNote(noteBoxData.note_box_id)
            .then((res) => {
                setNoteList(res.data)
            }).catch((err) => console.log(err))
    }, [noteBoxData]);

    const handleClickTitle = () => {
        const e = document.getElementById(`note_box_${noteBoxData.note_box_id}`)
            .children[1].children[1].style;
        (e.display === "none") ? (e.display = "block") : (e.display = "none");
    }
    const handleClickPriority = () => {
        let pri = noteBoxData.priority;
        if (noteBoxData.priority === 2) {
            pri = 1;
        } else if (noteBoxData.priority !== 3) {
            pri = 2;
        }
        if (pri === 3) return;
        const data = {
            note_box_id: noteBoxData.note_box_id,
            user_id: noteBoxData.user_id,
            note_box_title: noteBoxData.note_box_title,
            note_box_description: noteBoxData.note_box_description,
            created_at: noteBoxData.created_at,
            updated_at: noteBoxData.updated_at,
            status: noteBoxData.status,
            priority: pri
        }
        noteBoxAPI().update(data);
        varNotePage.reSetNoteBoxList();
    }
    const handleClickStatus = () => {
        const stt = (!noteBoxData.status) ? 1 : 0;
        const data = {
            note_box_id: noteBoxData.note_box_id,
            user_id: noteBoxData.user_id,
            note_box_title: noteBoxData.note_box_title,
            note_box_description: noteBoxData.note_box_description,
            created_at: noteBoxData.created_at,
            updated_at: noteBoxData.updated_at,
            status: stt,
            priority: (stt === 1) ? 3 : 2
        }
        noteBoxAPI().update(data);
        varNotePage.reSetNoteBoxList();
    }
    const handleClickBtnEditChild = (e) => {
        e.preventDefault();
        varNotePage.setCurrentNoteBox({
            note_box_id: noteBoxData.note_box_id,
            note_box_title: noteBoxData.note_box_title,
            note_box_description: noteBoxData.note_box_description
        })
        varNotePage.setEditNoteBox(!varNotePage.editNoteBox);
        varNotePage.setDetailNoteBox(!varNotePage.detaiNoteBox);
    }
    const handleClickBtnDeleteChild = (e) => {
        e.preventDefault();
        varNotePage.setCurrentNoteBox(noteBoxData);
        varNotePage.setDeleteFunction("delete-note-box");
        varNotePage.setConfirmDialog(true);
    }
    const handleClickBtnAddNote = (e) => {
        varNotePage.setDetailNote(!varNotePage.detailNote);
        varNotePage.setCurrentNoteBox(noteBoxData);
    }

    // Phần code xử lý drag, swap and drop
    let CurrentEle;
    let x = 0; let y = 0;
    let containerFigure;
    let figure;
    let placeHolder;
    let isDragging = false;

    const handleMouseDown = (e) => {
        CurrentEle = e.target.parentElement.parentElement.parentElement;
        const container = CurrentEle.parentElement;

        figure = CurrentEle.getBoundingClientRect();
        containerFigure = container.getBoundingClientRect();

        x = e.pageX - figure.left;
        y = e.pageY - figure.top;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }
    const handleMouseMove = (e) => {
        CurrentEle.style.position = "absolute";
        CurrentEle.style.width = figure.width + "px";
        const left = e.pageX - x - containerFigure.left;
        const top = e.pageY - y - containerFigure.top;
        CurrentEle.style.left = `${left}px`;
        CurrentEle.style.top = `${top}px`;

        if (!isDragging) {
            isDragging = true;
            placeHolder = document.createElement('div');
            placeHolder.setAttribute("class", styles.placeHolder);
            placeHolder.style.width = figure.width + "px";
            placeHolder.style.height = figure.height + "px";
            CurrentEle.parentElement.insertBefore(placeHolder, CurrentEle.nextElementSibling);
        }

        let pointer = { x: e.pageX, y: e.pageY };
        const preEle = CurrentEle.previousElementSibling;
        const posEle = placeHolder.nextElementSibling;

        if (CurrentEle && preEle && action.checkOverPreEle(pointer, preEle)) {
            action.swap(placeHolder, CurrentEle);
            action.swap(placeHolder, preEle);
        }

        if (CurrentEle && posEle && action.checkOverPosEle(pointer, posEle)) {
            action.swap(placeHolder, CurrentEle);
            action.swap(posEle, placeHolder);
        }
    }
    const handleMouseUp = () => {
        CurrentEle.style.removeProperty('position');
        CurrentEle.style.removeProperty('top');
        CurrentEle.style.removeProperty('left');
        CurrentEle = null;
        x = null;
        y = null;
        containerFigure = null;
        figure = null;

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        placeHolder && placeHolder.parentElement && placeHolder.parentElement.removeChild(placeHolder);
        isDragging = false;

        const thisNoteBox = document.getElementById(`note_box_${noteBoxData.note_box_id}`)
        const newList = Array.from(thisNoteBox.querySelectorAll("#note-list > .g_item"));
        const data = [];
        newList.forEach((item, index) => {
            data[index] = item.lastChild.id;
        })
        noteAPI().updatePriority(data);
    }

    return (
        <div className={styles.noteBox} id={`note_box_${noteBoxData.note_box_id}`}>
            <div className="g_header">
                <div className="g_title">
                    <i
                        className={`fa-solid fa-star g_boxpriority_${noteBoxData.priority}`}
                        onClick={handleClickPriority}
                    ></i>
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={handleClickTitle}
                    >{noteBoxData.note_box_title}</span>
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
                        : (<div className={`g_status ${(noteBoxData.status === 1) && "g_boxsuccess"}`}>
                            <i
                                className="fa-solid fa-check"
                                onClick={handleClickStatus}
                            ></i>
                        </div>)
                }
            </div>
            <div className="g_body g_scroll">
                <div className={styles.NoteList} id="note-list">
                    {noteList.map((note) => (
                        <Note
                            key={note.note_id}
                            noteData={note}
                            handleMouseDown={handleMouseDown}
                        />
                    ))}
                    {(varNotePage.editMode) && (
                        <div className="g_item">
                            <div
                                className={`${styles.btnAddNote}`}
                                onClick={handleClickBtnAddNote}
                            >
                                <i className="fa-solid fa-square-pen g_m_r1"></i>
                                <span>{noteLang.newNote[getLanguage('YoleUser')]}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="g_description" style={{ display: "none" }}>
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