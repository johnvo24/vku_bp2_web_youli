import styles from './Statistic.module.css'
import React, {useContext, useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {statistic} from "../../../api/BudgetPageAPI";
import * as GCONTENT from '../../../Constants/languages/GlobalWord'
import {MyUserContext} from "../../../App";
import {timeConverter} from "../../../Middlewares/Middlewares";

export default function Statistic(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(MyUserContext)

    useEffect(() => {
        statistic(props.id)
            .then(res => {
                let sum = 0

                for (let i = 0; i < res.length; ++i)
                    if (res[i].type === 'cost') {
                        sum -= res[i].item_cost
                        res[i].item_cost = sum
                    } else {
                        sum += res[i].item_cost
                        res[i].item_cost = sum;
                    }

                for(let i = 0; i < res.length; ++i) {
                    res[i].bill_time = timeConverter(res[i].bill_time, 'd/m/y')
                }
                console.log(res)
                setData(res)
                setLoading(true)
            })
    }, [])

    return (
        <>
            <div className={styles.statistic}>
                {loading && (
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="bill_time"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line
                            type="monotone"
                            dataKey="item_cost"
                            stroke="#8884d8"
                            activeDot={{r: 8}}
                            name="Amount"
                        />
                        <Legend/>
                    </LineChart>
                )}
                <div className={styles.btnGroup}>
                    <button type='button' className={styles.btn} onClick={() => {
                        props.statisticTheme(false)
                        props.mainTheme(true)
                    }}>{GCONTENT.back[context[1]]}</button>
                </div>
            </div>
        </>
    )

}