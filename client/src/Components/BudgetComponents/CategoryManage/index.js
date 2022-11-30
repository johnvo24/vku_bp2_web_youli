import React, {useContext} from "react"

//components
import styles from './CategoryManage.module.css'
import Container from "../../Container";
import * as CONTENT from "../../../Constants/languages/Expenditure";
import * as GCONTENT from '../../../Constants/languages/GlobalWord'
import {useState} from "react";
import {MyUserContext} from "../../../App";
import {updateWalletBudget} from "../../../api/BudgetPageAPI";
import SnackBar from "../../SnackBar";
import Category from "../Category";
import Header from "../Header";
import ViewCategory from "../ViewCategory";

export default function Wallet(props) {
    const data = useContext(MyUserContext)
    const [category, setCategory] = useState(false)

    return (
        <>
            <div className={styles.walletTheme}>
                <div className={styles.container}>
                    {category && (
                        <>
                            <Category theme={setCategory}/>
                        </>
                    )}
                    {!category && (
                        <>
                            <Header
                                context={CONTENT.yourCate[data[1]]}
                                onClick={() => {
                                    if (!category) {
                                        props.mainTheme(true)
                                        props.walletTheme(false)
                                    } else {
                                        setCategory(false)
                                    }
                                }}
                                useCreate={!category}
                                onCreate={() => {
                                    setCategory(true)
                                }}
                            />
                            <ViewCategory/>
                        </>
                    )}

                </div>
            </div>
        </>
    )

}