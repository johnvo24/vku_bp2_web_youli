import React, {useContext, useState} from "react"

import styles from '../AddItem/AddItem.module.css'
import Container from "../../Container";
import * as CONTENT from "../../../Constants/languages/Expenditure";
import * as GCONTENT from "../../../Constants/languages/GlobalWord";
import {MyUserContext} from "../../../App";
import {addCategory} from "../../../api/BudgetPageAPI";
import Header from "../Header";
import SnackBar from "../../SnackBar";

export default function Category(props) {

    const data = useContext(MyUserContext)
    const user = JSON.parse(localStorage.getItem('YoleUser'))
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')

    const onsubmit = () => {
        addCategory({
            user_id: user.user_id,
            type: document.getElementById('classify').value,
            category_name: document.getElementById('name').value
        })
            .then(() => {
                setMsg('Created Successful')
                setOpen(true)
            })
            .catch(err => {
                setMsg(err.response.data)
                setOpen(true)
            })
    }

    const reset = () => {
        document.getElementById('name').value = ''
        document.getElementById('classify').selectedIndex = 0
    }

    return (
        <>
            <Header
                context={CONTENT.addCategory[data[1]]}
                useBack={true}
                onClick={() => props.theme(false)}
                useReset={true}
                useSave={true}
                onReset={reset}
                onSave={onsubmit}
            />
            <SnackBar
                open={open}
                duration={5000}
                setOpen={setOpen}
            >
                {msg}
            </SnackBar>
            <div className={styles.informationContainer} style={{marginTop: '100px'}}>
                <label className={styles.label} htmlFor='name'>{CONTENT.categoryName[data[1]]}</label>
                <input type='text' id='name' className={styles.input}/>
                <label className={styles.label} htmlFor='classify'>{CONTENT.categoryCat[data[1]]}</label>
                <div className={styles.selectCtn}>
                    <select id='classify' className={`${styles.input} ${styles.select}`}
                            onFocus={e => e.target.size=2}
                            onBlur={e => e.target.size=1}
                            onChange={e => e.target.blur()}
                    >
                        <option value='income'>{CONTENT.incomeCat[data[1]]}</option>
                        <option value='cost'>{CONTENT.costCat[data[1]]}</option>
                    </select>
                </div>
            </div>
        </>
    )

}