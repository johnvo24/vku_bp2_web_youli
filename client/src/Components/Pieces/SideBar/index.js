import styles from './SideBar.module.css'
import './SideBar.css';
import BtnNew from '../Buttons/BtnNew';
import BtnClean from '../Buttons/BtnClean';
import BtnEdit from '../Buttons/BtnEdit';

function SideBar({ handleClickSideBar, handleClickBtnEdit }) {
    return (
        <div className={styles.sideBar}>
            <ul type="none">
                <BtnNew 
                    handleClickSideBar={handleClickSideBar}
                />
                <BtnEdit
                    handleClickBtnEdit={handleClickBtnEdit}
                />
                <BtnClean
                    handleClickSideBar={handleClickSideBar}
                />
            </ul>
        </div>
    )
}

export default SideBar;