import { listOfNavBar } from '../../../../Constants/GlobalVariables';
import styles from './BtnView.module.css'

function BtnView({lang, handleClickSideBar }) {
    return (
        <a
            onClick={(e) => handleClickSideBar(e, listOfNavBar.view.lang[lang])}
            className={styles.btnView}
        >
            <li>
                <i className={listOfNavBar.view.icon}></i>
            </li>
        </a>
    )
}

export default BtnView;