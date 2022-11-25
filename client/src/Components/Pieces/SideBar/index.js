import { useState } from 'react';
import styles from './SideBar.module.css'
import './SideBar.css';
import BtnView from '../Buttons/BtnView';
import { getCurrentUser } from '../../../Middlewares/Middlewares';
import { listOfNavBar } from '../../../Constants/GlobalVariables';
import BtnNew from '../Buttons/BtnNew';

function SideBar({ handleClickSideBar }) {
    return (
        <div className={styles.sideBar}>
            <ul type="none">
                <BtnView
                    lang={getCurrentUser('YoleUser').language}
                    handleClickSideBar={handleClickSideBar}
                />
                <BtnNew 
                    lang={getCurrentUser('YoleUser').language}
                    handleClickSideBar={handleClickSideBar}
                />
            </ul>
        </div>
    )
}

export default SideBar;