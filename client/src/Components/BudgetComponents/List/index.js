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

    const handleData = input => {
        console.log(input)
        let stack_name = []
        let stack_list = {}
        for (let i = 0; i < input.length; ++i) {
            if (!stack_name.includes(input[i].category_name)) {
                stack_name.push(input[i].category_name)
                stack_list[input[i].category_name] = [input[i]]
            } else {
                stack_list[input[i].category_name] = [...stack_list[input[i].category_name], input[i]]
            }
            // console.log(stack_list)
        }

        let stack_array = []

        Object.entries(stack_list).forEach(([key, value]) => {
            stack_array.push({key, value})
        })

        console.log(stack_array)

        return stack_array
    }

    return (
        <>
            {loading && (
                <>
                    <div className={styles.list}>
                        <Container customStyles={{
                            border: '1px solid red',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: itemTheme ? 'center' : ''
                        }}>

                            {!itemTheme && !catTheme && (
                                <>
                                    <div className={styles.overflow}>
                                        {data.map((items, idx) => (
                                            <>
                                                <SlideToggle
                                                    bestPerformance={true}
                                                    key={idx}
                                                >
                                                    {({toggle, setCollapsibleElement}) => (
                                                        <div className={styles.slideToggle}>
                                                            <button className={styles.btn} onClick={toggle}>
                                                                > {items.key}
                                                            </button>
                                                            <div className={styles.contentCtn}
                                                                 ref={setCollapsibleElement}>
                                                                {items.value.map((sub_items, idx) => (
                                                                    <li className={styles.content} key={idx}
                                                                        onClick={() => {
                                                                            setItemTheme(true)
                                                                            setItem(sub_items)
                                                                        }}>{sub_items.item_title}</li>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </SlideToggle>

                                            </>
                                        ))}
                                    </div>
                                    <div className={styles.btnGroup}>
                                        <button type='button' className={styles.btnCat} onClick={() => {
                                            props.mainTheme(true)
                                            props.resetTheme(false)
                                        }}>{GCONTENT.back[context[1]]}</button>
                                        <button type='button' className={styles.btnCat} onClick={() => {
                                            setCatTheme(true)
                                        }}>{CONTENT.addCategory[context[1]]}</button>
                                    </div>
                                </>
                            )}
                            {itemTheme && (
                                <Item data={item} theme={setItemTheme}/>
                            )}
                            {catTheme && (
                                <Category theme={setCatTheme}/>
                            )}


                        </Container>
                    </div>
                </>
            )}

        </>
    )

}