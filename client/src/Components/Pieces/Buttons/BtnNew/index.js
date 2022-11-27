import { listOfNavBar } from '../../../../Constants/GlobalVariables';
import styles from './BtnNew.module.css'

function BtnNew({ handleClickSideBar }) {
    return (
        <a
            onClick={(e) => handleClickSideBar(e, 'new')}
            className={styles.btnNew}
        >
            <li>
                <i className={listOfNavBar.new.icon}></i>
            </li>
        </a>
    )
}

export default BtnNew;