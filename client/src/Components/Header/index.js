import styles from './Header.module.css'

function Header() {

    const user = JSON.parse(localStorage.getItem('YoleUser'))

    return (
        <div className={styles.header}>
            <div
                className={styles.logoPage}
            >
                Logo
            </div>
            <div className={styles.btnGroup}>
                <button className={styles.signin} onClick={() => window.location.href = '/sign-in'}>
                    Sign in
                </button>
                <button className={styles.signup} onClick={() => window.location.href = '/sign-up'}>
                    Sign up
                </button>
            </div>

        </div>
    )
}

export default Header;