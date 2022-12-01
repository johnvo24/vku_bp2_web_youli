import styles from './BtnChooseFile.module.css'
import { listOfNavBar } from '../../../../Constants/GlobalVariables';

function BtnChooseFile({ handleClickBtnChooseFile })  {
    return (
        <a
            onClick={(e) => handleClickBtnChooseFile(e)}
            className={styles.btnChooseFile}
        >
            <li>
                <i className={listOfNavBar.chooseFile.icon}></i>
            </li>
        </a>
    )
}

export default BtnChooseFile;