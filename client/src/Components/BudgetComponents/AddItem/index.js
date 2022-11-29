import React, {useContext, useEffect, useState} from "react"

//components
import styles from './AddItem.module.css'
import Container from "../../Container";
import * as CONTENT from '../../../Constants/languages/Expenditure'
import * as GCONTENT from '../../../Constants/languages/GlobalWord'
import {MyUserContext} from "../../../App";
import {getCategory, submitItemForm} from "../../../api/BudgetPageAPI";
import Header from "../Header";
import SnackBar from "../../SnackBar";

export default function AddItem(props) {
    const data = useContext(MyUserContext)
    const user = JSON.parse(localStorage.getItem('YoleUser'))
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [alert, setAlert] = useState('abc')
    const [open, setOpen] = useState(false)

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
                user_id: user.user_id
            }, document.getElementById('classify').options[document.getElementById('classify').selectedIndex].text,
            document.getElementById('classify').value)
            .then(() => {
                setAlert('Save Successful!')
                setOpen(true)
            })
            .catch(err => {
                setAlert(err.response.data)
                setOpen(true)
            })
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
            <SnackBar
                duration={3000}
                open={open}
                setOpen={setOpen}
            >{alert}</SnackBar>
            <div className={styles.itemTheme}>
                <Header context={CONTENT.createBill[data[1]]}
                        onClick={() => {
                            props.mainTheme(true)
                            props.itemTheme(false)
                        }}
                        useSave={true}
                        onSave={onSubmit}
                        useReset={true}
                        onReset={reset}
                />
                <div className={styles.header}>{CONTENT.itemHeader[data[1]]}</div>
                <div className={styles.informationContainer}>
                    <label className={styles.label} htmlFor='name'>{CONTENT.purchasedItemName[data[1]]}</label>
                    <input type='text' id='name' className={styles.input}/>
                    <label className={styles.label} htmlFor='description'>{CONTENT.itemDescription[data[1]]}</label>
                    <input type='text' id='description' className={styles.input}/>
                    <label className={styles.label} htmlFor='price'>{CONTENT.itemPrice[data[1]]}</label>
                    <input type='number' id='price' className={styles.input}/>
                    <label className={styles.label} htmlFor='time'>{CONTENT.purchaseTime[data[1]]}</label>
                    <input type='datetime-local' id='time' className={styles.input}/>
                    <label className={styles.label} htmlFor='classify'>{CONTENT.itemClassify[data[1]]}</label>
                    <select id='classify' className={styles.input}>
                        {loading && (
                            <>
                                {categories.map((items, id) => (
                                        <option key={id} style={{
                                            color: items.type === 'cost' ? 'red' : 'green'
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
            </div>
        </>
    )

}