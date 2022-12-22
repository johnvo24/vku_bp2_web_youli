import SideBar from "../../Pieces/SideBar";
import BtnNew from "../../Pieces/Buttons/BtnNew";

function SideBarSchedule({ handleClickSideBar }) {
    return (
        <SideBar>
            <BtnNew
                handleClickSideBar={handleClickSideBar}
            />
        </SideBar>
    )
}

export default SideBarSchedule;