import styles from "./NotePage.module.css"
import SideBar from "../../Components/Pieces/SideBar";
import { useEffect, useState } from "react";
import MainContainer from "../../Components/Pieces/MainContainer";
import noteBoxAPI from "../../api/noteBoxAPI";
import NoteContainer from "../../Components/NoteComponents/NoteContainer";
import { action } from "./action";
import Detail from "../../Components/Pieces/Detail";

function NotePage() {
    const [noteBoxList, setNodeBoxList] = useState([])
    const [reRender, setReRender] = useState(false)

    useEffect(() => {
        noteBoxAPI().getView()
            .then((res) => {
                setNodeBoxList(res.data)
            }).catch((err) => { console.log(err) });
    }, [reRender])

    const handleClickSideBar = (event, action) => {
        event.preventDefault();
        switch (action) {
            case "view":
                noteBoxAPI().getView()
                    .then((res) => {
                        setNodeBoxList(res.data);
                    }).catch((err) => { console.log(err) })
                break;
            case "new":
                
            default:
                break;
        }
    }
    const handleReRenderNoteBoxList = () => {
        setReRender(!reRender)
    }



    return (
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
            <Detail>
                
            </Detail>
        </div>
    )
}

export default NotePage;