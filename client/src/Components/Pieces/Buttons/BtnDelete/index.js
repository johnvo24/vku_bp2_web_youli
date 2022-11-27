import styles from './BtnDelete.module.css'
import { listOfNavBar } from '../../../../Constants/GlobalVariables';

function BtnDelete({ handleClickBtnDelete })  {
    return (
        <a
            onClick={(e) => handleClickBtnDelete(e)}
            className={styles.btnDelete}
        >
            <li>
                <i className={listOfNavBar.delete.icon}></i>
            </li>
        </a>
    )
}

export default BtnDelete;