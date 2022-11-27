import React, {useContext} from "react"

//components
import styles from './Wallet.module.css'
import Container from "../../Container";
import * as CONTENT from "../../../Constants/languages/Expenditure";
import * as GCONTENT from '../../../Constants/languages/GlobalWord'
import {useState} from "react";
import {MyUserContext} from "../../../App";
import {updateWalletBudget} from "../../../api/BudgetPageAPI";
import SnackBar from "../../SnackBar";

export default function Wallet(props) {
    const [isEdit, setEdit] = useState({
        balance: false
    })
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const data = useContext(MyUserContext)

    const onSubmit = async () => {
        const value = document.getElementById('balance').value
        await updateWalletBudget(props.wallet.wallet_id, value)
            .then(() => window.location.reload())
            .catch(err => {
                setMsg(err.response.data)
                setOpen(true)
            })
    }

    return (
        <>
            <div className={styles.walletTheme}>
                <SnackBar
                    open={open}
                    setOpen={setOpen}
                    style={{
                        backgroundColor: 'pink'
                    }}
                    duration={5000}
                >
                    {msg}
                </SnackBar>

                <Container customStyles={{
                    border: '1px solid red',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div className={styles.balance}>
                        <label className={styles.walletTitle}
                               htmlFor='balance'>{CONTENT.balance[data[1]]}</label>
                        {isEdit.balance ?
                            (
                                <>
                                    <input type='text' id='balance' className={styles.walletEditor}
                                           defaultValue={props.wallet.budget.toString()}/>
                                    <div className={styles.cancel} onClick={() => {
                                        setEdit({...isEdit, balance: false})
                                    }}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </div>
                                </>
                            ) :
                            (
                                <>
                                    <label
                                        className={styles.walletTitle2}>{`${props.wallet.budget.toString()}$`}</label>
                                    <div className={styles.touchable} onClick={() => {
                                        setEdit({...isEdit, balance: true})
                                    }}>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </div>
                                </>
                            )}
                    </div>

                    <div className={styles.bankContainer}>
                        <h1 className={styles.walletTitle3}>{CONTENT.bank[data[1]]}</h1>
                        <div className={styles.bank}>
                            <i className="fa-brands fa-cc-visa" style={{fontSize: '4.5em'}}> < /i>
                            <i className="fa-brands fa-cc-paypal" style={{fontSize: '4.5em'}}></i>
                            <i className="fa-brands fa-cc-mastercard" style={{fontSize: '4.5em'}}></i>
                            <i className="fa-brands fa-cc-jcb" style={{fontSize: '4.5em'}}></i>
                            <i className="fa-brands fa-cc-amex" style={{fontSize: '4.5em'}}></i>
                            <i className="fa-brands fa-cc-stripe" style={{fontSize: '4.5em'}}></i>
                        </div>
                    </div>
                    <div className={styles.btnGroup}>
                        <button type='button' className={styles.back} onClick={
                            () => {
                                props.mainTheme(true)
                                props.walletTheme(false)
                            }}>{GCONTENT.back[data[1]]}</button>
                        <button type='button' className={styles.save} onClick={onSubmit}>{GCONTENT.save[data[1]]}</button>
                    </div>
                </Container>
            </div>
        </>
    )

}