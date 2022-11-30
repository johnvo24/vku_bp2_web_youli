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

function BudgetPage() {
    const [wallet, setWallet] = useState({})
    const data = useContext(MyUserContext)
    const [mainTheme, setMainTheme] = useState(true)
    const [categoryTheme, setCategoryTheme] = useState(false)
    const [statisticTheme, setStatisticTheme] = useState(false)
    const [addItemTheme, setAddItemTheme] = useState(false)
    const [listTheme, setListTheme] = useState(false)
    const [loading, setLoading] = useState(false)
    const [statusColor, setStatusColor] = useState('')
    const [cost, setCost] = useState()

    useEffect(() => {
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
                                <h1 className={styles.title}><i className={`fa - solid fa-wallet ${styles.icon}`}></i>{CONTENT.yourWallet[data[1]]}</h1>
                                <h1 className={styles.wallet} style={{color: 'green'}}>{wallet.budget}</h1>
                            </div>
                            <div className={styles.costContainer}>
                                <h1 className={styles.title}><i className={`fa - solid fa-money-bill-transfer ${styles.icon}`}></i>{CONTENT.totalCost[data[1]]}</h1>
                                <h1 className={styles.wallet} style={{color: 'red'}}>{cost}</h1>
                            </div>
                        </div>
                        <div className={styles.rightSide}>
                            {mainTheme && (
                                <>
                                    <div className={styles.circleBar}>
                                        <div className={styles.lineUp}/>
                                        <div className={styles.lineDown}/>
                                        <div className={styles.yourCate} onClick={() => {
                                            setCategoryTheme(true)
                                            setMainTheme(false)
                                        }}>
                                            <i className="fa-solid fa-cube" style={{fontSize: '4.5em'}}></i>
                                        </div>
                                        <div className={styles.statistic} onClick={() => {
                                            setStatisticTheme(true)
                                            setMainTheme(false)
                                        }}>
                                            <i className="fa-solid fa-chart-pie" style={{fontSize: '4.5em'}}></i>
                                        </div>
                                        <div className={styles.addItem} onClick={() => {
                                            setAddItemTheme(true)
                                            setMainTheme(false)
                                        }}>
                                            <i className="fa-solid fa-cart-plus" style={{fontSize: '4.5em'}}></i>
                                        </div>
                                        <div className={styles.list} onClick={() => {
                                            setListTheme(true)
                                            setMainTheme(false)
                                        }}>
                                            <i className="fa-solid fa-clipboard-list" style={{fontSize: '4.5em'}}></i>
                                        </div>
                                        <div className={styles.dot}/>
                                    </div>
                                </>
                            )}

                            {categoryTheme && (
                                <Wallet wallet={wallet} mainTheme={setMainTheme} walletTheme={setCategoryTheme}/>
                            )}
                            {addItemTheme && (
                                <AddItem itemTheme={setAddItemTheme} mainTheme={setMainTheme} id={wallet.wallet_id}/>
                            )}
                            {statisticTheme && (
                                <Statistic statisticTheme={setStatisticTheme} mainTheme={setMainTheme}
                                           id={wallet.wallet_id}/>
                            )}
                            {listTheme && (
                                <List resetTheme={setListTheme} mainTheme={setMainTheme} id={wallet.wallet_id}/>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default BudgetPage;