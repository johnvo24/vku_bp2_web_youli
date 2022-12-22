import { createContext, useEffect, useState } from "react";
import MainContainer from "../../Components/Pieces/MainContainer";
import ScheduleContainer from "../../Components/ScheduleComponent/ScheduleContainer";
import SideBarSchedule from "../../Components/ScheduleComponent/SideBarSchedule";
import styles from "./SchedulePage.module.css"

export const ScheduleContext = createContext();

function SchedulePage() {
    const [week, setWeek] = useState([]);

    useEffect(() => {
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
    }, []);
    
    const handleClickSideBar = (e) => {
        e.preventDefault();
    }

    return (
        <ScheduleContext.Provider
            value={{
                week: week,
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
            </div>
        </ScheduleContext.Provider>
    )
}

export default SchedulePage;