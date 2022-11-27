import React, {useContext} from "react";

import styles from './Item.module.css'
import {MyUserContext} from "../../../App";
import * as GContent from "../../../Constants/languages/GlobalWord"

export default function Item(props) {

    const data = useContext(MyUserContext)

    return (
        <>
            <div className={styles.item}>
                <h1 className={styles.title}>{`Title: ${props.data.item_title}`}</h1>
                <h1 className={styles.title}>{`Description: ${props.data.item_description}`}</h1>
                <h1 className={styles.title} style={{color: props.data.type !== 'cost' ? 'green' : 'red'}}>{`Amount: ${props.data.type === 'cost' ? '-' : '+'}${props.data.item_cost}`}</h1>
                <h1 className={styles.title}>{`At: ${props.data.bill_time}`}</h1>
                <div className={styles.btnGroup}>
                    <button type='button' onClick={() => {
                        props.theme(false)
                    }}>{GContent.back[data[1]]}</button>
                </div>
            </div>
        </>
    )

}