import styles from './SideBar.module.css'
import './SideBar.css';
import BtnNew from '../Buttons/BtnNew';
import BtnClean from '../Buttons/BtnClean';

function SideBar({ handleClickSideBar }) {
    return (
        <div className={styles.sideBar}>
            <ul type="none">
                <BtnNew 
                    handleClickSideBar={handleClickSideBar}
                />
                <BtnClean
                    handleClickSideBar={handleClickSideBar}
                />
            </ul>
        </div>
    )
}

export default SideBar;