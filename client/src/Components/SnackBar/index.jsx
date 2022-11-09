import React from "react"

import styles from './SnackBar.module.css'

export default function SnackBar(props) {

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