import React from "react"
import styles from './Header.module.css'

export default function Header(props) {

    return (
        <div className={styles.header}>
                <i className={`fa-solid fa-chevron-left ${styles.back}`} onClick={props.onClick}></i>
                {props.context}
        </div>
    )

}