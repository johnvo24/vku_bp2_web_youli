import styles from './BtnSave.module.css'
import { listOfNavBar } from '../../../../Constants/GlobalVariables';
import { getLanguage } from '../../../../Middlewares/Middlewares';

function BtnSave({ handleClickBtnSave })  {
    return (
        <a
            onClick={(e) => handleClickBtnSave(e)}
            className={styles.btnSave}
        >
            <li>
                <span>{ listOfNavBar.save.lang[getLanguage('YoleUser')] }</span>
            </li>
        </a>
    )
}

export default BtnSave;