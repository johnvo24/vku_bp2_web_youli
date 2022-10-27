import styles from "./NotePage.module.css"
import SideBar from "../../Components/Pieces/SideBar";
import { useContext } from "react";
import { MyUserContext } from "../../App";
import MainContainer from "../../Components/Pieces/MainContainer";
import SideList from "../../Components/Pieces/SideList";

const noteList = [
    {
        id: "00001",
        priority: 1,
        title: "Đi chợ",
        list: [
            "",
        ]
    }
]

function NotePage() {

    const data = useContext(MyUserContext)

    return (
        <div
            className={styles.notePage}
        >
            {/* {console.log(currentDevice)} */}
            <SideBar list={data[0].note}/>
            <MainContainer />
            <SideList />
        </div>
    )
}

export default NotePage;