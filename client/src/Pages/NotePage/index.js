import styles from "./NotePage.module.css"
import { createContext, useEffect, useState } from "react";
import MainContainer from "../../Components/Pieces/MainContainer";
import NoteContainer from "../../Components/NoteComponents/NoteContainer";
import { action } from "./action";
import Detail from "../../Components/Pieces/Detail";
import DetailNoteBox from "../../Components/NoteComponents/DetailNoteBox";
import ConfirmationDialog from "../../Components/NoteComponents/ConfirmationDialog";
import { noteLang } from "../../Constants/languages/NoteLanguages";
import {getLanguage, hasLoggedIn} from "../../Middlewares/Middlewares";
import DetailNote from "../../Components/NoteComponents/DetailNote";
import SideBarNote from "../../Components/NoteComponents/SideBarNote";

export const NotePageContext = createContext();

function NotePage() {
    const [noteBoxList, setNodeBoxList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [detailNoteBox, setDetailNoteBox] = useState(false);
    const [detailNote, setDetailNote] = useState(false);
    const [editNoteBox, setEditNoteBox] = useState(false);
    const [editNote, setEditNote] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);

    const [deleteFunction, setDeleteFunction] = useState(() => {});

    const [currentNoteBox, setCurrentNoteBox] = useState(null);
    const [currentNote, setCurrentNote] = useState(null);

    if (!hasLoggedIn()) {
        window.location.href = '/sign-in'
    }

    const reSetNoteBoxList = () => {
        action.reSetNoteBoxList(setNodeBoxList);
    }
    useEffect(() => {
        reSetNoteBoxList();
    }, [])

    const handleClickBtnEdit = (event) => {
        event.preventDefault();
        handleClickSideBar(event, 'edit');
    }
    const handleClickSideBar = (event, act, ) => {
        event.preventDefault();
        switch (act) {
            case "new":
                setDetailNoteBox(!detailNoteBox);
                break;
            case "clean":
                setDeleteFunction("clean-note-box");
                setConfirmDialog(!confirmDialog);
                break;
            case "edit":
                editMode && setEditNoteBox(false);
                setEditMode(!editMode);
                break;
            default:
                break;
        }
    }
    
    return (
        <NotePageContext.Provider
            value={{
                currentNoteBox: currentNoteBox,
                setCurrentNoteBox: setCurrentNoteBox,
                
                currentNote: currentNote,
                setCurrentNote: setCurrentNote,

                detailNoteBox: detailNoteBox,
                setDetailNoteBox: setDetailNoteBox,

                detailNote: detailNote,
                setDetailNote: setDetailNote,
                
                noteBoxList: noteBoxList,
                reSetNoteBoxList: reSetNoteBoxList,

                setConfirmDialog: setConfirmDialog,

                editMode: editMode,

                editNoteBox: editNoteBox,
                setEditNoteBox: setEditNoteBox,

                editNote: editNote,
                setEditNote: setEditNote,

                setDeleteFunction: setDeleteFunction,
            }}
        >
            <div
                className={styles.notePage}
            >
                <MainContainer>
                    <NoteContainer
                        noteBoxList={noteBoxList}
                    />
                </MainContainer>

                <SideBarNote
                    handleClickSideBar={handleClickSideBar}
                    handleClickBtnEdit={handleClickBtnEdit}
                />
                {(detailNoteBox || confirmDialog || detailNote) && (<Detail>
                    {(detailNoteBox) && <DetailNoteBox />}
                    {(detailNote) && <DetailNote />}
                    {(confirmDialog) && (<ConfirmationDialog
                        deleteFunction={
                            (deleteFunction === "clean-note-box")
                                ? (() => action.deleteFinishedNoteBox())
                                : ((deleteFunction === "delete-note-box")
                                    ? (() => action.deleteNoteBox(currentNoteBox.note_box_id))
                                    : (() => action.deleteNote(currentNote.note_id)))
                        }
                    >
                        {noteLang.noteBoxMessengeDialog[getLanguage('YoleUser')]}
                    </ConfirmationDialog>)}
                </Detail>)}
            </div>
        </NotePageContext.Provider>
    )
}

export default NotePage;