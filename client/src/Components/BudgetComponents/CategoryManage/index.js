import React, {useContext} from "react"

//components
// import styles from './CategoryManage.module.css'
// import Container from "../../Container";
// import * as CONTENT from "../../../Constants/languages/Expenditure";
// import * as GCONTENT from '../../../Constants/languages/GlobalWord'
// import {useState} from "react";
// import {MyUserContext} from "../../../App";
// import {updateWalletBudget} from "../../../api/BudgetPageAPI";
// import SnackBar from "../../SnackBar";
// import Category from "../Category";
// import Header from "../Header";
// import ViewCategory from "../ViewCategory";

export default function Wallet(props) {
    // const [msg, setMsg] = useState('')
    // const [open, setOpen] = useState(false)
    // const data = useContext(MyUserContext)
    // const [category, setCategory] = useState(false)
    //
    // const onSubmit = async () => {
    //     const value = document.getElementById('balance').value
    //     await updateWalletBudget(props.wallet.wallet_id, value)
    //         .then(() => window.location.reload())
    //         .catch(err => {
    //             setMsg(err.response.data)
    //             setOpen(true)
    //         })
    // }
    //
    // const reset = () => {
    //
    // }

    return (
        <>
            {/*<SnackBar*/}
            {/*    open={open}*/}
            {/*    setOpen={setOpen}*/}
            {/*    duration={5000}*/}
            {/*>*/}
            {/*    {msg}*/}
            {/*</SnackBar>*/}
            {/*<div className={styles.walletTheme}>*/}
            {/*    <Header*/}
            {/*        context={CONTENT.yourCate[data[1]]}*/}
            {/*        onClick={() => {*/}
            {/*            if(!category) {*/}
            {/*                props.mainTheme(true)*/}
            {/*                props.walletTheme(false)*/}
            {/*            }*/}
            {/*            else {*/}
            {/*                setCategory(false)*/}
            {/*            }*/}
            {/*        }}*/}
            {/*        useCreate={!category}*/}
            {/*        onCreate={() => {*/}
            {/*            setCategory(true)*/}
            {/*        }}*/}
            {/*        useReset={category}*/}
            {/*        useSave={category}*/}
            {/*        onReset={reset}*/}
            {/*        onSave={onSubmit}*/}
            {/*    />*/}
            {/*    <div className={styles.container}>*/}
            {/*        {category && (*/}
            {/*            <Category/>*/}
            {/*        )}*/}
            {/*        {!category && (*/}
            {/*            <ViewCategory />*/}
            {/*        )}*/}

            {/*    </div>*/}
            {/*</div>*/}
        </>
    )

}