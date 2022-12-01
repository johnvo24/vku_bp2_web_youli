import { listOfNavBar } from '../../../../Constants/GlobalVariables';
import styles from './BtnEdit.module.css'

function BtnEdit({ handleClickBtnEdit }) {
    return (
        <a
            onClick={(e) => handleClickBtnEdit(e)}
            className={styles.btnEdit}
        >
            <li>
                <i className={listOfNavBar.edit.icon}></i>
            </li>
        </a>
    )
}

export default BtnEdit;