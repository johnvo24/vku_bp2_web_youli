import React, {useContext, useEffect, useState} from "react"

//components
import styles from '../AddItem/AddItem.module.css'
import Container from "../../Container";
import * as CONTENT from '../../../Constants/languages/Expenditure'
import * as GCONTENT from '../../../Constants/languages/GlobalWord'
import {MyUserContext} from "../../../App";
import {getCategory, submitItemForm, updateMilestone} from "../../../api/BudgetPageAPI";
import Header from "../Header";
import SnackBar from "../../SnackBar";

export default function ManageWallet(props) {
    const data = useContext(MyUserContext)
    const user = JSON.parse(localStorage.getItem('YoleUser'))
    const [alert, setAlert] = useState('abc')
    const [open, setOpen] = useState(false)

    const onSubmit = () => {
        updateMilestone({
                wallet_id: props.id,
                value: document.getElementById('milestone').value
            })
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
        document.getElementById('milestone').value = props.milestone
    }

    return (
        <>
            <SnackBar
                duration={3000}
                open={open}
                setOpen={setOpen}
            >{alert}</SnackBar>
            <div className={styles.itemTheme}>
                <Header context={CONTENT.manageWallet[data[1]]}
                        onClick={() => {
                            props.manageTheme(false)
                        }}
                        useSave={true}
                        onSave={onSubmit}
                        useReset={true}
                        onReset={reset}
                />
                <div className={styles.header}>{CONTENT.manageHeader[data[1]]}</div>
                <div className={styles.informationContainer}>
                    <label className={styles.label} htmlFor='milestone'>{CONTENT.milestone[data[1]]}</label>
                    <input type='number' id='milestone' className={styles.input} defaultValue={props.milestone}/>
                </div>
            </div>
        </>
    )

}