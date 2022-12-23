import styles from './HeroSection.module.css'
import * as CONTENT from '../../../Constants/languages/Homepage'
import {useContext} from "react";
import {MyUserContext} from "../../../App";

export default function HeroSection(props) {
    const image_url = '/resources/images/time.jpg'
    const context = useContext(MyUserContext)

    return (
        <div className={styles.container} style={{ backgroundImage : `url(${image_url})` }}>
            <h1 className={styles.title}>Manage Your Life, Leave Failure Behind</h1>
            <div className={styles.router}>
                <div className={styles.column} onClick={() => window.location.href='/note'}>
                    <i className={`fa-regular fa-note-sticky ${styles.columnIcon}`}></i>
                    <div className={styles.columnContent}>
                        {CONTENT.noteRow[context[1]]}
                    </div>
                </div>
                <div className={styles.column} onClick={() => window.location.href='/schedule'}>
                    <i className={`fa-regular fa-calendar-days ${styles.columnIcon}`}></i>
                    <div className={styles.columnContent}>
                        {CONTENT.schedualRow[context[1]]}
                    </div>
                </div>
                <div className={styles.column} onClick={() => window.location.href='/budget'}>
                    <i className={`fa-solid fa-wallet ${styles.columnIcon}`}></i>
                    <div className={styles.columnContent}>
                        {CONTENT.walletRow[context[1]]}
                    </div>
                </div>
            </div>
            <div className={styles.content}>

            </div>
        </div>
    )

}