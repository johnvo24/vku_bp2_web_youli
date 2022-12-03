import React from "react"
import styles from './Header.module.css'

export default function Header(props) {

    return (
        <div className={styles.header}>
            <div className={styles.main}>
                {props.useBack && (
                    <i className={`fa-solid fa-chevron-left ${styles.back}`} onClick={props.onClick}></i>
                )}
                {props.context}
            </div>
            <div className={styles.btnGroup}>
                {props.useDelete && (
                    <i className={`fa-solid fa-trash-can ${styles.delete}`} onClick={props.onDelete}></i>
                )}
                {props.useReset && (
                    <i className={`fa-solid fa-rotate-right ${styles.delete}`} onClick={props.onReset}></i>
                )}
                {props.useSave && (
                    <i className={`fa-solid fa-check ${styles.delete}`} onClick={props.onSave}></i>
                )}
                {props.useCreate && (
                    <i className={`fa-solid fa-plus ${styles.delete}`} onClick={props.onCreate}></i>
                )}
            </div>
        </div>
    )

}