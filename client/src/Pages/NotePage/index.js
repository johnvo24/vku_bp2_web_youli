import styles from "./NotePage.module.css"
import SideBar from "../../Components/Pieces/SideBar";
import { useContext, useState } from "react";
import { MyUserContext } from "../../App";
import MainContainer from "../../Components/Pieces/MainContainer";
import noteBoxAPI from "../../api/noteBoxAPI";
import NoteContainer from "../../Components/NoteComponents/NoteContainer";

let noteBoxListInit = [];
noteBoxAPI().getView()
    .then((res) => {
        noteBoxListInit = res.data;
    }).catch((err) => { console.log(err) });


function NotePage() {
    const data = useContext(MyUserContext);
    const [noteBoxList, setNodeBoxList] = useState(noteBoxListInit)

    const handleClickSideBar = (event, action) => {
        event.preventDefault();
        switch (action) {
            case "view":
                noteBoxAPI().getView()
                    .then((res) => {
                        setNodeBoxList(res.data);
                    }).catch((err) => { console.log(err) })
                break;

            default:
                break;
        }
    }

    return (
        <div
            className={styles.notePage}
        >
            <SideBar
                list={data[0].note}
                handleClickSideBar={handleClickSideBar}
            />
            <MainContainer>
                <NoteContainer noteBoxList={noteBoxList} />
            </MainContainer>
            {/* <SideList /> */}
        </div>
    )
}

export default NotePage;