import styles from './BtnDeleteChild.module.css'
import { listOfNavBar } from '../../../../Constants/GlobalVariables';

function BtnDeleteChild({ handleClickBtnDeleteChild })  {
    return (
        <a
            onClick={(e) => handleClickBtnDeleteChild(e)}
            className={styles.btnDeleteChild}
        >
            <li>
                <i className={listOfNavBar.delete.icon}></i>
            </li>
        </a>
    )
}

export default BtnDeleteChild;