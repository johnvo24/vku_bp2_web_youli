import { listOfNavBar } from '../../../../Constants/GlobalVariables';
import styles from './BtnView.module.css'

function BtnView({ handleClickSideBar }) {
    return (
        <a
            href='#'
            onClick={(e) => handleClickSideBar(e, 'view')}
            className={styles.btnView}
        >
            <li>
                <i className={listOfNavBar.view.icon}></i>
            </li>
        </a>
    )
}

export default BtnView;