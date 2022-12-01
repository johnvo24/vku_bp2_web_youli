import { listOfNavBar } from '../../../../Constants/GlobalVariables';
import styles from './BtnEditChild.module.css'

function BtnEditChild({ handleClickBtnEditChild }) {
    return (
        <a
            onClick={(e) => handleClickBtnEditChild(e)}
            className={styles.btnEditChild}
        >
            <li>
                <i className={listOfNavBar.edit.icon}></i>
            </li>
        </a>
    )
}

export default BtnEditChild;