import styles from './BtnSave.module.css'
import { listOfNavBar } from '../../../../Constants/GlobalVariables';

function BtnSave({ handleClickBtnSave })  {
    return (
        <a
            onClick={(e) => handleClickBtnSave(e)}
            className={styles.btnSave}
        >
            <li>
                <i className={listOfNavBar.save.icon}></i>
            </li>
        </a>
    )
}

export default BtnSave;