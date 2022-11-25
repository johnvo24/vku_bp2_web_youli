import {useEffect, useState} from "react";

//components
import styles from "./BudgetPage.module.css"
import {getWalletData} from "../../api/BudgetPageAPI";
import * as CONTENT from "../../Constants/languages/Expenditure";
import {useContext} from "react";
import {MyUserContext} from "../../App";
import '../../Components/GlobalStyle'
import Wallet from "../../Components/BudgetComponents/Wallet";
import AddItem from "../../Components/BudgetComponents/AddItem";
import Statistic from "../../Components/BudgetComponents/Statistic";
import List from "../../Components/BudgetComponents/List";

function BudgetPage() {
    const [wallet, setWallet] = useState({})
    const data = useContext(MyUserContext)
    const [mainTheme, setMainTheme] = useState(true)
    const [walletTheme, setWalletTheme] = useState(false)
    const [statisticTheme, setStatisticTheme] = useState(false)
    const [addItemTheme, setAddItemTheme] = useState(false)
    const [listTheme, setListTheme] = useState(false)
    const [loading, setLoading] = useState(false)
    const [statusColor, setStatusColor] = useState('')

    useEffect(() => {
        async function fetch() {
            const data = await getWalletData(JSON.parse(localStorage.getItem('YoleUser')).user_id)
            setWallet(data)
        }

        fetch().then()
    }, [])

    useEffect(() => {
        if (wallet.length !== 0) {

            setLoading(true)
            if (wallet.budget === 0)
                setStatusColor('darkgray')
            else if (wallet.status === 1)
                setStatusColor('lawngreen')
            else if (wallet.status === 2)
                setStatusColor('#E1D046')
            else if (wallet.status === 3)
                setStatusColor('red')
            console.log(wallet)
        }
    }, [wallet])

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                {loading && (
                    <>

                        <div className={styles.leftSide}>
                            <div className={styles.walletContainer}>
                                <h1 className={styles.title}>{CONTENT.yourWallet[data[1]]}</h1>
                                <h1 className={styles.wallet}>{wallet.budget}</h1>
                            </div>
                            <div className={styles.costContainer}>
                                <h1 className={styles.title}>{CONTENT.totalCost[data[1]]}</h1>
                                <h1 className={styles.wallet}>{0}</h1>
                            </div>
                            <div className={styles.listContainer}>
                                <h1 className={styles.title}>{CONTENT.status[data[1]]}</h1>
                                <div className={styles.circle} style={{backgroundColor: statusColor}}/>
                            </div>
                        </div>
                        <div className={styles.rightSide}>
                            {mainTheme && (
                                <>
                                    <div className={styles.circleBar}>
                                        <div className={styles.lineUp}/>
                                        <div className={styles.lineDown}/>
                                        <div className={styles.yourWallet} onClick={() => {
                                            setWalletTheme(true)
                                            setMainTheme(false)
                                        }}>
                                            <i className="fa-solid fa-wallet" style={{fontSize: '4.5em'}}></i>
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

                            {walletTheme && (
                                <Wallet wallet={wallet} mainTheme={setMainTheme} walletTheme={setWalletTheme}/>
                            )}
                            {addItemTheme && (
                                <AddItem itemTheme={setAddItemTheme} mainTheme={setMainTheme} id={wallet.wallet_id}/>
                            )}
                            {statisticTheme && (
                                <Statistic statisticTheme={setStatisticTheme} mainTheme={setMainTheme}/>
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