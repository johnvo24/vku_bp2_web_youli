import React, {useContext, useEffect, useState} from "react"

//components
import styles from './AddItem.module.css'
import Container from "../../Container";
import * as CONTENT from '../../../Constants/languages/Expenditure'
import * as GCONTENT from '../../../Constants/languages/GlobalWord'
import {MyUserContext} from "../../../App";
import {getCategory, submitItemForm} from "../../../api/BudgetPageAPI";

export default function AddItem(props) {
    const data = useContext(MyUserContext)
    const user = JSON.parse(localStorage.getItem('YoleUser'))
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategory(user.user_id)
            .then(res => {
                setCategories(res)
                setLoading(true)
            })
    }, [])

    const onSubmit = () => {
        submitItemForm({
            wallet_id: props.id,
            item_title: document.getElementById('name').value,
            item_description: document.getElementById('description').value,
            item_cost: document.getElementById('price').value,
            bill_time: document.getElementById('time').value,
            category_id: document.getElementById('classify').value
        })
            .then()
    }

    const reset = () => {
        document.getElementById('name').value = ''
        document.getElementById('description').value = ''
        document.getElementById('price').value = ''
        document.getElementById('time').value = ''
        document.getElementById('classify').selectedIndex = 0
    }

    return (
        <>
            <div className={styles.itemTheme}>
                <Container customStyles={{
                    border: '1px solid red',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div className={styles.header}>{CONTENT.itemHeader[data[1]]}</div>
                    <div className={styles.informationContainer}>
                        <label className={styles.label} htmlFor='name'>{CONTENT.purchasedItemName[data[1]]}</label>
                        <input type='text' id='name' className={styles.input}/>
                        <label className={styles.label} htmlFor='description'>{CONTENT.itemDescription[data[1]]}</label>
                        <input type='text' id='description' className={styles.input}/>
                        <label className={styles.label} htmlFor='price'>{CONTENT.itemPrice[data[1]]}</label>
                        <input type='text' id='price' className={styles.input}/>
                        <label className={styles.label} htmlFor='time'>{CONTENT.purchaseTime[data[1]]}</label>
                        <input type='date' id='time' className={styles.input}/>
                        <label className={styles.label} htmlFor='classify'>{CONTENT.itemClassify[data[1]]}</label>
                        <select id='classify' className={styles.input}>
                            {loading && (
                                <>
                                    {categories.map((items, id) => (
                                            <option key={id} style={{
                                                color: items.type === 'cost' ? 'red' : 'black'
                                            }}
                                                value={items.category_id}
                                            >
                                                {items.category_name}
                                            </option>
                                        )
                                    )}
                                </>
                            )}
                        </select>
                    </div>
                    <div className={styles.btnGroup}>
                        <button className={styles.btn} onClick={
                            () => {
                                props.itemTheme(false)
                                props.mainTheme(true)
                            }}>{GCONTENT.back[data[1]]}</button>
                        <button className={styles.btn}
                                onClick={reset}>{GCONTENT.reset[data[1]]}</button>
                        <button className={styles.btn}
                                onClick={onSubmit}>{GCONTENT.save[data[1]]}</button>
                    </div>
                </Container>
            </div>
        </>
    )

}