import styles from "./NotePage.module.css"
import SideBar from "../../Components/Pieces/SideBar";
import { createContext, useEffect, useState } from "react";
import MainContainer from "../../Components/Pieces/MainContainer";
import NoteContainer from "../../Components/NoteComponents/NoteContainer";
import { action } from "./action";
import Detail from "../../Components/Pieces/Detail";
import DetailNoteBox from "../../Components/NoteComponents/DetailNoteBox";
import ConfirmationDialog from "../../Components/NoteComponents/ConfirmationDialog";

export const NotePageContext = createContext();

function NotePage() {
    const [noteBoxList, setNodeBoxList] = useState([]);
    const [detailNoteBox, setDetailNoteBox] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [reRender, setReRender] = useState(false);

    const reSetNoteBoxList = () => {
        action.reSetNoteBoxList(setNodeBoxList);
    }
    useEffect(() => {
        reSetNoteBoxList();
    }, [reRender])

    const handleClickSideBar = (event, action) => {
        event.preventDefault();
        switch (action) {
            case "new":
                setDetailNoteBox(!detailNoteBox);
                break;
            case "clean":
                setConfirmDialog(!confirmDialog);
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
                setDetailNoteBox: setDetailNoteBox,
                reSetNoteBoxList: reSetNoteBoxList,
                setConfirmDialog: setConfirmDialog,
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
                />
                {(detailNoteBox || confirmDialog) && (<Detail>
                    {(detailNoteBox) && <DetailNoteBox />}
                    {(confirmDialog) && <ConfirmationDialog />}
                </Detail>)}
            </div>
        </NotePageContext.Provider>
    )
}

export default NotePage;