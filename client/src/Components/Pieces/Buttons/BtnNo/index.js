import styles from './BtnNo.module.css'
import { listOfNavBar } from '../../../../Constants/GlobalVariables';
import { getLanguage } from '../../../../Middlewares/Middlewares';

function BtnNo({ handleClickBtnNo })  {
    return (
        <a
            onClick={(e) => handleClickBtnNo(e)}
            className={styles.btnNo}
        >
            <li>
                <span>{ listOfNavBar.no.lang[getLanguage('YoleUser')] }</span>
            </li>
        </a>
    )
}

export default BtnNo;