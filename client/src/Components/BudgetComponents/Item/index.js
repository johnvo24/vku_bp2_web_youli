import React, {useContext, useState} from "react";

import styles from './Item.module.css'
import {MyUserContext} from "../../../App";
import * as Content from "../../../Constants/languages/Expenditure"
import Header from "../Header";
import AlertDialog from "../../AlertDialog";
import {deleteWithoutRefund, deleteWithRefund} from "../../../api/BudgetPageAPI";

export default function Item(props) {

    const data = useContext(MyUserContext)
    const [dialog, setDialog] = useState(false)
    const user = JSON.parse(localStorage.getItem('YoleUser'))

    const format = input => {
        return input.slice(0, 10) + ', ' + input.slice(11, 19)
    }

    const onDelete = async () => {
        setDialog(true)
    }

    function getData() {
        return {
            bill_id: props.data.bill_id,
            item_cost: props.data.item_cost,
            wallet_id: props.id,
            user_id: user.user_id
        }
    }

    const noRefund = async () => {
        await deleteWithoutRefund(props.data.bill_id)
        window.location.reload()
    }

    const refund = async () => {
        await deleteWithRefund(getData(), props.data.category_name,
            props.data.category_id ? props.data.category_id : props.data.c_category_id)
        window.location.reload()
    }

    return (
        <>
            <AlertDialog
                active={dialog}
                content={Content.refund[data[1]]}
                denyContent='No'
                acceptContent='Yes'
                thirdButton={true}
                thirdContent='Cancel'
                onThird={() => setDialog(false)}
                onDeny={noRefund}
                onAccept={refund}
            />
            <Header context='Details'
                    onClick={() => {
                        props.theme(false)
                    }}
                    useDelete={true}
                    onDelete={onDelete}
            />
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