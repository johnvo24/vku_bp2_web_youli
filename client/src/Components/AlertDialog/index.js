import React from "react"

import styles from './AlertDialog.module.css'

export default function AlertDialog(props) {

    return (
        <>
            {props.active && (
                <div className={styles.container}>
                    <div className={styles.box}>
                        <h1>{props.content}</h1>
                        <div className={styles.btnGroup}>
                            {props.thirdButton && (
                                <button type='button' onClick={props.onThird}
                                        className={styles.deny}>{props.thirdContent}</button>
                            )}
                            <button type='button' onClick={props.onDeny}
                                    className={styles.deny}>{props.denyContent}</button>
                            <button type='button' onClick={props.onAccept}
                                    className={styles.accept}>{props.acceptContent}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}