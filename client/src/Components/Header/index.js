import styles from './Header.module.css'
import SlideToggle from "react-slide-toggle";
import {useEffect} from "react";
import {hasLoggedIn} from "../../Middlewares/Middlewares";

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
                {!user && (
                    <>
                        <button className={styles.signin} onClick={() => window.location.href = '/sign-in'}>
                            Sign in
                        </button>
                        <button className={styles.signup} onClick={() => window.location.href = '/sign-up'}>
                            Sign up
                        </button>
                    </>
                )}
                {user && (
                    <SlideToggle
                        collapsed={true}
                        render={({toggle, setCollapsibleElement}) => (
                            <div className={styles.user}>
                                <button className={styles.userBtn} onClick={toggle}>
                                    <img src={`./resources/uploads/${user.user_avatar}`} alt='avatar' className={styles.avatar}/>
                                    {user.display_name}
                                </button>
                                <div className={styles.btngroup} ref={setCollapsibleElement}>
                                    <button
                                        type='button'
                                        className={styles.btn}
                                        onClick={() => {
                                            window.location.href='/profile'
                                        }}
                                    >
                                        <i className="fa-solid fa-address-card" />Profile
                                    </button>
                                    <button
                                        type='button'
                                        className={styles.btn}
                                        onClick={() => {
                                            localStorage.clear('YoleUser')
                                            window.location.reload()
                                        }}
                                    >
                                        <i className="fa-solid fa-right-from-bracket" />Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                )}
            </div>

        </div>
    )
}

export default Header;