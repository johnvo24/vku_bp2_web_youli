import React, {useContext, useEffect, useState} from "react"
import SlideToggle from "react-slide-toggle";

//components
import styles from './List.module.css'
import Container from '../../Container';
import {getBills} from "../../../api/BudgetPageAPI";
import Item from "../Item";
import * as CONTENT from '../../../Constants/languages/Expenditure'
import * as GCONTENT from '../../../Constants/languages/GlobalWord'
import {MyUserContext} from "../../../App";
import Category from "../Category";
import Header from "../Header";

export default function List(props) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [item, setItem] = useState({})
    const [itemTheme, setItemTheme] = useState(false)
    const [catTheme, setCatTheme] = useState(false)

    const context = useContext(MyUserContext)

    useEffect(() => {
        getBills(props.id)
            .then(res => {
                setData(handleData(res))
                setLoading(true)
            })
    }, [])

    const sort = array => {
        for (let i = 0; i < array.length - 1; ++i)
            for (let j = i + 1; j < array.length; ++j)
                if (array[i].key < array[j].key) {
                    const temp = array[i].key
                    array[i].key = array[j].key
                    array[j].key = temp;
                }

        for (let i = 0; i < array.length; ++i)
            array[i].key = array[i].key.slice(0, 10)

        return array
    }

    const handleData = input => {
        let stack_date = []
        let stack_list = {}
        for (let i = 0; i < input.length; ++i) {
            if (!stack_date.includes(input[i].bill_time.slice(0, 10))) {
                stack_date.push(input[i].bill_time.slice(0, 10))
                stack_list[input[i].bill_time.slice(0, 10)] = [input[i]]
            } else {
                stack_list[input[i].bill_time.slice(0, 10)] = [...stack_list[input[i].bill_time.slice(0, 10)], input[i]]
            }
        }

        let stack_array = []

        Object.entries(stack_list).forEach(([key, value]) => {
            stack_array.push({key, value})
        })

        stack_array = sort(stack_array)

        return stack_array
    }

    const totalExpense = data => {
        let sum = 0

        for (let i = 0; i < data.length; ++i)
            if (data[i].type === 'cost')
                sum += data[i].item_cost

        return sum
    }

    return (
        <>
            {loading && (
                <>
                    <div className={styles.list}>

                        {!itemTheme && !catTheme && (
                            <>
                                <Header context={CONTENT.expenditureHistory[context[1]]}/>
                                <div className={`${styles.overflow} g_scroll`}>
                                    {data.length !== 0 && data.map((items, idx) => (
                                        <>
                                            <div className={styles.contentContainer} key={idx}>
                                                <div className={styles.contentTitle}>
                                                    <div className={styles.time}>{items.key}</div>
                                                    <div
                                                        className={styles.total}>{`Expense: ${totalExpense(items.value)}`}</div>
                                                </div>
                                                <div className={styles.contentBody}>
                                                    {items.value.map((sub_item, index) => (
                                                        <div className={styles.contentItemContainer} key={index}>
                                                            <div className={styles.contentItem} onClick={() => {
                                                                setItem(sub_item)
                                                                setItemTheme(true)
                                                            }}>
                                                                {sub_item.item_title} <span
                                                                className={`${styles.contentCat} g_m_l2`}>{` ${sub_item.category_name}`}</span>
                                                            </div>
                                                            <div
                                                                style={{color: sub_item.type === 'cost' ? 'red' : 'green'}}>
                                                                {`${sub_item.type === 'cost' ? '-' : '+'}${sub_item.item_cost}`}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                    {data.length === 0 && (
                                        <div className={styles.emptyContainer}>
                                            <p className={styles.empty}>There is no data to show :/</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                        {itemTheme && (
                            <Item data={item} theme={setItemTheme} id={props.id}/>
                        )}
                        {/*{catTheme && (*/}
                        {/*    <Category theme={setCatTheme}/>*/}
                        {/*)}*/}
                    </div>
                </>
            )}

        </>
    )

}