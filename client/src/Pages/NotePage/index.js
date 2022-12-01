import styles from "./NotePage.module.css"
import SideBar from "../../Components/Pieces/SideBar";
import { createContext, useEffect, useState } from "react";
import MainContainer from "../../Components/Pieces/MainContainer";
import NoteContainer from "../../Components/NoteComponents/NoteContainer";
import { action } from "./action";
import Detail from "../../Components/Pieces/Detail";
import DetailNoteBox from "../../Components/NoteComponents/DetailNoteBox";
import ConfirmationDialog from "../../Components/NoteComponents/ConfirmationDialog";
import { noteLang } from "../../Constants/languages/NoteLanguages";
import { getLanguage } from "../../Middlewares/Middlewares";
import DetailNote from "../../Components/NoteComponents/DetailNode";

export const NotePageContext = createContext();

function NotePage() {
    const [noteBoxList, setNodeBoxList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [detailNoteBox, setDetailNoteBox] = useState(false);
    const [detailNote, setDetailNote] = useState(false);
    const [editNoteBox, setEditNoteBox] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [reRender, setReRender] = useState(false);

    const [currentNoteBox, setCurrentNoteBox] = useState(null);
    const [currentNote, setCurrentNote] = useState(null);

    const reSetNoteBoxList = () => {
        action.reSetNoteBoxList(setNodeBoxList);
    }
    useEffect(() => {
        reSetNoteBoxList();
    }, [reRender])

    const handleClickBtnEdit = (event) => {
        event.preventDefault();
        handleClickSideBar(event, 'edit');
    }
    const handleClickSideBar = (event, action, ) => {
        event.preventDefault();
        switch (action) {
            case "new":
                setDetailNoteBox(!detailNoteBox);
                break;
            case "clean":
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
    const handleReRenderNoteBoxList = () => {
        setReRender(!reRender)
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
            }}
        >
            <div
                className={styles.notePage}
            >
                <MainContainer>
                    <NoteContainer
                        noteBoxList={noteBoxList}
                        handleReRenderNoteBoxList={handleReRenderNoteBoxList}
                    />
                </MainContainer>

                <SideBar
                    handleClickSideBar={handleClickSideBar}
                    handleClickBtnEdit={handleClickBtnEdit}
                />
                {(detailNoteBox || confirmDialog || detailNote) && (<Detail>
                    {(detailNoteBox) && <DetailNoteBox />}
                    {(detailNote) && <DetailNote />}
                    {(confirmDialog) && (<ConfirmationDialog>
                        {noteLang.noteBoxMessengeDialog[getLanguage('YoleUser')]}
                    </ConfirmationDialog>)}
                </Detail>)}
            </div>
        </NotePageContext.Provider>
    )
}

export default NotePage;