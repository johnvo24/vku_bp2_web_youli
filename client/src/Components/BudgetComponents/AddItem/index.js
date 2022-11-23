import React, {useContext, useEffect, useState} from "react"

//components
import styles from './AddItem.module.css'
import Container from "../../Container";
import * as CONTENT from '../../../Constants/languages/Expenditure'
import * as GCONTENT from '../../../Constants/languages/GlobalWord'
import {MyUserContext} from "../../../App";
import {getCategory} from "../../../api/BudgetPageAPI";

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
                                            }}>
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
                        <button className={styles.btn}>{GCONTENT.reset[data[1]]}</button>
                        <button className={styles.btn}>{GCONTENT.save[data[1]]}</button>
                    </div>
                </Container>
            </div>
        </>
    )

}