import styles from './Header.module.css'

function Header() {
    return (
        <div className={styles.header}>
            <div
                className={styles.logoPage}    
            >
                Logo
            </div>
        </div>
    )
}

export default Header;