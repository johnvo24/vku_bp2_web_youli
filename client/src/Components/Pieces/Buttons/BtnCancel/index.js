import styles from './BtnCancel.module.css'
import { listOfNavBar } from '../../../../Constants/GlobalVariables';
import { getLanguage } from '../../../../Middlewares/Middlewares';

function BtnCancel({ handleClickBtnCancel })  {
    return (
        <a
            onClick={(e) => handleClickBtnCancel(e)}
            className={styles.btnCancel}
        >
            <li>
                <span>{ listOfNavBar.cancle.lang[getLanguage('YoleUser')] }</span>
            </li>
        </a>
    )
}

export default BtnCancel;