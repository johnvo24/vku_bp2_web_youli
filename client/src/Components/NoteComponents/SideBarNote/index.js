import SideBar from "../../Pieces/SideBar";
import BtnNew from "../../Pieces/Buttons/BtnNew";
import BtnEdit from "../../Pieces/Buttons/BtnEdit";
import BtnClean from "../../Pieces/Buttons/BtnClean";


function SideBarNote({ handleClickSideBar, handleClickBtnEdit}) {
    return (
        <SideBar>
            <BtnNew
                handleClickSideBar={handleClickSideBar}
            />
            <BtnEdit
                handleClickBtnEdit={handleClickBtnEdit}
            />
            <BtnClean
                handleClickSideBar={handleClickSideBar}
            />
        </SideBar>
    )
}

export default SideBarNote;