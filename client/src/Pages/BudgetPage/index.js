import {useEffect, useState} from "react";

//components
import styles from "./BudgetPage.module.css"
import {getWalletData, totalCost} from "../../api/BudgetPageAPI";
import * as CONTENT from "../../Constants/languages/Expenditure";
import {useContext} from "react";
import {MyUserContext} from "../../App";
import '../../Components/GlobalStyle'
import Wallet from "../../Components/BudgetComponents/CategoryManage";
import AddItem from "../../Components/BudgetComponents/AddItem";
import Statistic from "../../Components/BudgetComponents/Statistic";
import List from "../../Components/BudgetComponents/List";
import {hasLoggedIn} from "../../Middlewares/Middlewares";

function BudgetPage() {
    const [wallet, setWallet] = useState({})
    const data = useContext(MyUserContext)
    const [categoryTheme, setCategoryTheme] = useState(false)
    const [statisticTheme, setStatisticTheme] = useState(false)
    const [addItemTheme, setAddItemTheme] = useState(false)
    const [listTheme, setListTheme] = useState(true)
    const [loading, setLoading] = useState(false)
    const [cost, setCost] = useState()

    useEffect(() => {
        if(!hasLoggedIn())
            window.location.href='/sign-in'
        getWalletData(JSON.parse(localStorage.getItem('YoleUser')).user_id)
            .then(res => {
                setWallet(res)
            })
    }, [])

    useEffect(() => {
        totalCost(wallet.wallet_id)
            .then(res => {
                setCost(res)
                console.log(res)
                setLoading(true)
            })
    }, [wallet])

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                {loading && (
                    <>
                        <div className={styles.leftSide}>
                            <div className={styles.walletContainer}>
                                <h1 className={styles.title}>{CONTENT.yourWallet[data[1]]}</h1>
                                <h1 className={styles.wallet} style={{color: 'green'}}><i className={`fa - solid fa-wallet ${styles.icon}`}></i>{wallet.budget}</h1>
                            </div>
                            <div className={styles.costContainer}>
                                <h1 className={styles.title}>{CONTENT.totalCost[data[1]]}</h1>
                                <h1 className={styles.wallet} style={{color: 'red'}}><i className={`fa - solid fa-money-bill-transfer ${styles.icon}`}></i>{cost}</h1>
                            </div>
                            <div className={styles.addItem} onClick={() => {
                                setAddItemTheme(true)
                                setListTheme(false)
                                setCategoryTheme(false)
                                setStatisticTheme(false)
                            }}>
                                <i className={`fa-solid fa-cart-plus ${styles.icon}`}></i>{CONTENT.addExpenditure[data[1]]}
                            </div>
                            <div className={styles.yourCate} onClick={() => {
                                setAddItemTheme(false)
                                setListTheme(false)
                                setCategoryTheme(true)
                                setStatisticTheme(false)
                            }}>
                                <i className={`fa-solid fa-cube ${styles.icon}`}></i>{CONTENT.yourCate[data[1]]}
                            </div>
                            <div className={styles.statistic} onClick={() => {
                                setAddItemTheme(false)
                                setListTheme(false)
                                setCategoryTheme(false)
                                setStatisticTheme(true)
                            }}>
                                <i className={`fa-solid fa-chart-pie ${styles.icon}`}></i>{CONTENT.statistic[data[1]]}
                            </div>

                            <div className={styles.list} onClick={() => {
                                setListTheme(true)
                                setAddItemTheme(false)
                                setCategoryTheme(false)
                                setStatisticTheme(false)
                            }}>
                                <i className={`fa-solid fa-clipboard-list ${styles.icon}`}></i>{CONTENT.expenditureHistory[data[1]]}
                            </div>
                        </div>
                        <div className={styles.rightSide}>
                            {categoryTheme && (
                                <Wallet wallet={wallet} walletTheme={setCategoryTheme}/>
                            )}
                            {addItemTheme && (
                                <AddItem itemTheme={setAddItemTheme} id={wallet.wallet_id}/>
                            )}
                            {statisticTheme && (
                                <Statistic statisticTheme={setStatisticTheme}
                                           id={wallet.wallet_id}/>
                            )}
                            {listTheme && (
                                <List resetTheme={setListTheme} id={wallet.wallet_id}/>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default BudgetPage;