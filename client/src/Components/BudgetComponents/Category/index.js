import React, {useContext} from "react"

import styles from '../AddItem/AddItem.module.css'
import Container from "../../Container";
import * as CONTENT from "../../../Constants/languages/Expenditure";
import * as GCONTENT from "../../../Constants/languages/GlobalWord";
import {MyUserContext} from "../../../App";
import {addCategory} from "../../../api/BudgetPageAPI";

export default function Category(props) {

    const data = useContext(MyUserContext)
    const user = JSON.parse(localStorage.getItem('YoleUser'))

    const onsubmit = () => {
        addCategory({
            user_id: user.user_id,
            type: document.getElementById('classify').value,
            category_name: document.getElementById('name').value
        })
            .then()
    }

    return (
        <>
            <div className={styles.header}>{CONTENT.addCategory[data[1]]}</div>
            <div className={styles.informationContainer}>
                <label className={styles.label} htmlFor='name'>{CONTENT.categoryName[data[1]]}</label>
                <input type='text' id='name' className={styles.input}/>
                <label className={styles.label} htmlFor='classify'>{CONTENT.categoryCat[data[1]]}</label>
                <select id='classify' className={styles.input}>
                    <option value='income'>{CONTENT.incomeCat[data[1]]}</option>
                    <option value='cost'>{CONTENT.costCat[data[1]]}</option>
                </select>

            </div>
            <div className={styles.btnGroup}>
                <button className={styles.btn} onClick={
                    () => {
                        props.theme(false)
                    }}>{GCONTENT.back[data[1]]}</button>
                <button className={styles.btn}
                        onClick={onsubmit}
                >{GCONTENT.save[data[1]]}</button>
            </div>
        </>
    )

}