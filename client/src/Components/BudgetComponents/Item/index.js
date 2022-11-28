import React, {useContext} from "react";

import styles from './Item.module.css'
import {MyUserContext} from "../../../App";
import * as GContent from "../../../Constants/languages/GlobalWord"
import Header from "../Header";

export default function Item(props) {

    const data = useContext(MyUserContext)

    const format = input => {
        return input.slice(0, 10) + ', ' + input.slice(11, 19)
    }

    return (
        <>
            <Header context='Details'
                    onClick={() => {
                        props.theme(false)
                    }}/>
            <div className={styles.contentContainer}>
                <div className={styles.item}>
                    <h1 className={styles.title}>{props.data.item_title}</h1>
                    <h1 className={styles.title}
                        style={{color: props.data.type !== 'cost' ? 'green' : 'red'}}>{props.data.type === 'cost' ? '-' : '+'}{props.data.item_cost}</h1>

                </div>
                <div className={styles.item}>
                    <h1 className={styles.title}><i className="fa-solid fa-cubes"></i>Category: </h1>
                    <h1 className={styles.title}>{props.data.category_name}</h1>
                </div>
                <div className={styles.item}>
                    <h1 className={styles.title}><i className="fa-regular fa-calendar-days"></i> Date: </h1>
                    <h1 className={styles.title}>{format(props.data.bill_time)}</h1>
                </div>
                <div className={styles.btnGroup}>

                </div>
            </div>
        </>
    )

}