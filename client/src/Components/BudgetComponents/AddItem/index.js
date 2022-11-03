import React, {useContext} from "react"

//components
import styles from './AddItem.module.css'
import Container from "../../Container";
import * as CONTENT from '../../../Constants/languages/Expenditure'
import * as GCONTENT from '../../../Constants/languages/GlobalWord'
import {MyUserContext} from "../../../App";

export default function AddItem(props) {
    const data = useContext(MyUserContext)

    return (
        <>
            <div className={styles.itemTheme}>
                <Container customStyles={{
                    border: '1px solid red',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div className={styles.header}>{CONTENT.itemHeader[data[1]]}</div>
                    <div className={styles.informationContainer}>
                        <label className={styles.label} htmlFor='name'>{CONTENT.purchasedItemName[data[1]]}</label>
                        <input type='text' id='name' className={styles.input}/>
                        <label className={styles.label} htmlFor='price'>{CONTENT.itemPrice[data[1]]}</label>
                        <input type='text' id='price' className={styles.input}/>
                        <label className={styles.label} htmlFor='time'>{CONTENT.purchaseTime[data[1]]}</label>
                        <input type='text' id='time' className={styles.input}/>
                        <label className={styles.label} htmlFor='classify'>{CONTENT.itemClassify[data[1]]}</label>
                        <input type='text' id='classify' className={styles.input}/>
                    </div>
                    <div className={styles.btnGroup}>
                        <button className={styles} onClick={
                            () => {
                                props.itemTheme(false)
                                props.mainTheme(true)
                            }}>{GCONTENT.back[data[1]]}</button>
                        <button className={styles}>{GCONTENT.reset[data[1]]}</button>
                        <button className={styles}>{GCONTENT.save[data[1]]}</button>
                    </div>
                </Container>
            </div>
        </>
    )

}