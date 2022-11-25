import { listOfNavBar } from '../../../../Constants/GlobalVariables';
import styles from './BtnNew.module.css'

function BtnNew({lang, handleClickSideBar }) {
    return (
        <a
            onClick={(e) => handleClickSideBar(e, listOfNavBar.new.lang[lang])}
            className={styles.btnNew}
        >
            <li>
                <i className={listOfNavBar.new.icon}></i>
            </li>
        </a>
    )
}

export default BtnNew;