import React, {useContext, useEffect, useState} from "react"

import styles from './ViewCategory.module.css'
import {deleteCategory, renameCategory, viewCategories} from "../../../api/BudgetPageAPI";
import * as GCONTENT from '../../../Constants/languages/GlobalWord'
import {MyUserContext} from "../../../App";
import AlertDialog from "../../AlertDialog";
import SnackBar from "../../SnackBar";

export default function ViewCategory() {
    const user = JSON.parse(localStorage.getItem('YoleUser'))
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [click, setClick] = useState(false)
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const context = useContext(MyUserContext)

    useEffect(() => {
        viewCategories(user.user_id)
            .then(res => {
                setData(res)
                setLoading(true)
            })
    }, [])

    useEffect(() => {
        viewCategories(user.user_id)
            .then(res => {
                setData(res)
                setLoading(true)
            })
    }, [click])

    const onDelete = cate_id => {
        return () => {
            deleteCategory(cate_id)
                .then(() => window.location.reload())
        }
    }

    const onEdit = () => {
        renameCategory(id, document.getElementById('AlertEditor').value)
            .then(() => {
                setMsg('Changed Successful')
                setOpen(true)
                setClick(false)
            })
            .catch(err => {
                setMsg(err.response.data)
                setOpen(true)
                setClick(false)
            })
    }

    return (
        <>
            <SnackBar
                open={open}
                duration={5000}
                setOpen={setOpen}
            >
                {msg}
            </SnackBar>
            <div className={styles.view}>
                <AlertDialog
                    active={click}
                    content={`Old name: ${name}`}
                    edit={true}
                    placeHolder='Enter new name here'
                    denyContent='Cancel'
                    acceptContent='Ok'
                    onDeny={() => setClick(false)}
                    onAccept={onEdit}
                />
                {loading && (
                    <>
                        {data.length !== 0 && (
                            <table className={styles.table}>
                                <tbody>
                                <tr className={styles.header}>
                                    <th>ID</th>
                                    <th style={{textAlign: 'left'}}>{GCONTENT.name[context[1]]}</th>
                                </tr>
                                {data.map(items => (
                                    <tr
                                        key={items.category_id}
                                        className={styles.row}
                                    >
                                        <td className={styles.id}>{items.category_id}</td>
                                        <td className={styles.name}>
                                            <span
                                                style={{color: items.type === 'cost' ? 'red' : 'green', width: '100%'}}
                                            >{items.category_name}</span>
                                            <div className={styles.iconGroup}>
                                                <i
                                                    className={`fa-solid fa-trash-can ${styles.icon}`}
                                                    onClick={onDelete(items.category_id)}
                                                ></i>
                                                <i
                                                    className={`fa-solid fa-pen ${styles.icon}`}
                                                    onClick={() => {
                                                        setName(items.category_name)
                                                        setId(items.category_id)
                                                        setClick(true)
                                                    }}
                                                ></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                        {data.length === 0 && (
                            <p className={styles.empty}>There is no data to show :/</p>
                        )}
                    </>
                )}
            </div>
        </>
    )

}
