import styles from './BtnYes.module.css'
import { listOfNavBar } from '../../../../Constants/GlobalVariables';
import { getLanguage } from '../../../../Middlewares/Middlewares';

function BtnYes({ handleClickBtnYes })  {
    return (
        <a
            onClick={(e) => handleClickBtnYes(e)}
            className={styles.btnYes}
        >
            <li>
                <span>{ listOfNavBar.yes.lang[getLanguage('YoleUser')] }</span>
            </li>
        </a>
    )
}

export default BtnYes;