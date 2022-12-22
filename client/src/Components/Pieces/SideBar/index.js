import styles from './SideBar.module.css'
import './SideBar.css';

function SideBar({ children }) {
    return (
        <div className={styles.sideBar}>
            <ul type="none">
                { children }
            </ul>
        </div>
    )
}

export default SideBar;