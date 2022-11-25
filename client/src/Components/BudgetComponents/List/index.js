import React, {useEffect, useState} from "react"
import SlideToggle from "react-slide-toggle";

//components
import styles from './List.module.css'
import Container from '../../Container';
import {getBills} from "../../../api/BudgetPageAPI";

export default function List(props) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

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
            }
            else {
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
                            flexDirection: 'column'
                        }}>
                            {data.map((items, idx) => (
                                <SlideToggle
                                    bestPerformance={true}
                                    key={idx}
                                >
                                    {({toggle, setCollapsibleElement}) => (
                                        <div className="my-collapsible">
                                            <button className="my-collapsible__toggle" onClick={toggle}>
                                                {items.key}
                                            </button>
                                            <div className="my-collapsible__content" ref={setCollapsibleElement}>
                                                {items.value.map(sub_items => (
                                                    <div className="my-collapsible__content-inner">{sub_items.item_title}</div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </SlideToggle>
                            ))}
                        </Container>
                    </div>
                </>
            )}

        </>
    )

}