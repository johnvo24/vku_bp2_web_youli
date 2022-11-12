import React from "react"

import styles from './SnackBar.module.css'

export default function SnackBar(props) {

    if(props.duration !== null) {
         setTimeout(() => {
            props.setOpen(false)
        }, props.duration)
    }

    return (
        <>
            {props.open && (
                <>
                    <div className={styles.snackBar}
                         style={props.style}>
                        {props.children}
                    </div>
                </>
            )}

        </>
    )

}