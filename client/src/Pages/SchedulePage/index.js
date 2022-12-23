import { createContext, useEffect, useState } from "react";
import Detail from "../../Components/Pieces/Detail";
import MainContainer from "../../Components/Pieces/MainContainer";
import DetailTask from "../../Components/ScheduleComponent/DetailTask";
import ScheduleContainer from "../../Components/ScheduleComponent/ScheduleContainer";
import SideBarSchedule from "../../Components/ScheduleComponent/SideBarSchedule";
import styles from "./SchedulePage.module.css"

export const ScheduleContext = createContext();

function SchedulePage() {
    const [week, setWeek] = useState([]);
    const [detailTask, setDetailTask] = useState(false) 
    const [editTask, setEditTask] = useState(false) 

    const reSetWeek = () => {
        const today = new Date();
        let weekTemp = [];
        for(let i = 0; i < 7; i++) {
            let temp = new Date(today);
            temp.setDate(temp.getDate() + (i - (today.getDay() + 6)%7));
            weekTemp[i] = {
                date: temp,
            }
        }
        setWeek(weekTemp);
    }

    useEffect(() => {
        reSetWeek();
    }, []);
    
    const handleClickSideBar = (e, act) => {
        e.preventDefault();
        switch (act) {
            case "new":
                setDetailTask(!detailTask);
                break;
            // case "clean":
            //     setDeleteFunction("clean-note-box");
            //     setConfirmDialog(!confirmDialog);
            //     break;
            // case "edit":
            //     editMode && setEditNoteBox(false);
            //     setEditMode(!editMode);
            //     break;
            default:
                break;
        }
    }

    return (
        <ScheduleContext.Provider
            value={{
                week: week,
                reSetWeek: reSetWeek,
                detailTask: detailTask,
                setDetailTask: setDetailTask,
                editTask: editTask,
                setEditTask: setEditTask,
            }}
        >
            <div className={styles.schedulePage}>
                <MainContainer>
                    <ScheduleContainer>
                    </ScheduleContainer>
                </MainContainer>
                <SideBarSchedule
                    handleClickSideBar={handleClickSideBar}
                />
                {
                    (detailTask || editTask) && (<Detail>
                        <DetailTask />
                    </Detail>)
                }
            </div>
        </ScheduleContext.Provider>
    )
}

export default SchedulePage;