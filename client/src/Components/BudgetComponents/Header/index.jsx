import React from "react"
import styles from './Header.module.css'

export default function Header(props) {

    return (
        <div className={styles.header}>
            <div className={styles.main}>
                <i className={`fa-solid fa-chevron-left ${styles.back}`} onClick={props.onClick}></i>
                {props.context}
            </div>
            {props.useDelete && (
                <i className={`fa - solid fa-trash-can ${styles.delete}`} onClick={props.onDelete}></i>
            )}
        </div>
    )

}