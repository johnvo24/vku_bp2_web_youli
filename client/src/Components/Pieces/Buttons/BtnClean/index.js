import styles from './BtnClean.module.css'
import { listOfNavBar } from '../../../../Constants/GlobalVariables';

function BtnClean({ handleClickSideBar })  {
    return (
        <a
            onClick={(e) => handleClickSideBar(e, 'clean')}
            className={styles.btnClean}
        >
            <li>
                <i className={listOfNavBar.clean.icon}></i>
            </li>
        </a>
    )
}

export default BtnClean;