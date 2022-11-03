import {useEffect, useState} from "react";

//components
import styles from "./BudgetPage.module.css"
import {getWalletData, updateTimeToServer} from "../../api/BudgetPageAPI";
import * as CONTENT from "../../Constants/languages/Expenditure";
import {useContext} from "react";
import {MyUserContext} from "../../App";
import '../../Components/GlobalStyle'
import Wallet from "../../Components/BudgetComponents/Wallet";
import AddItem from "../../Components/BudgetComponents/AddItem";
import Statistic from "../../Components/BudgetComponents/Statistic";
import Reset from "../../Components/BudgetComponents/Reset";

function BudgetPage(props) {
    const [wallet, setWallet] = useState({})
    const data = useContext(MyUserContext)
    const [mainTheme, setMainTheme] = useState(true)
    const [walletTheme, setWalletTheme] = useState(false)
    const [statisticTheme, setStatisticTheme] = useState(false)
    const [addItemTheme, setAddItemTheme] = useState(false)
    const [resetTheme, setResetTheme] = useState(false)


    useEffect(() => {
        async function fetch() {
            const data = await getWalletData(props.user.UID)
            setWallet(data)
            const status = document.getElementById('status')
            if (data.yourWallet === '0')
                status.style.backgroundColor = 'darkgray'
            else if (data.status === '0')
                status.style.backgroundColor = 'lawngreen'
            else if (data.status === '1')
                status.style.backgroundColor = '#E1D046'
            else if (data.status === '2')
                status.style.backgroundColor = 'red'

        }

        fetch().then()
    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.walletContainer}>
                        <h1 className={styles.title}>{CONTENT.yourWallet[data[1]]}</h1>
                        <h1 className={styles.wallet}>{wallet.yourWallet}</h1>
                    </div>
                    <div className={styles.costContainer}>
                        <h1 className={styles.title}>{CONTENT.totalCost[data[1]]}</h1>
                        <h1 className={styles.wallet}>{wallet.totalCost}</h1>
                    </div>
                    <div className={styles.resetContainer}>
                        <h1 className={styles.title}>{CONTENT.status[data[1]]}</h1>
                        <div className={styles.circle} id='status'/>
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
                                <div className={styles.reset} onClick={() => setResetTheme(true)}>
                                    <i className="fa-solid fa-rotate-right" style={{fontSize: '4.5em'}}></i>
                                </div>
                                <div className={styles.dot}/>
                            </div>
                        </>
                    )}

                    {walletTheme && (
                        <Wallet wallet={wallet} mainTheme={setMainTheme} walletTheme={setWalletTheme}/>
                    )}
                    {addItemTheme && (
                        <AddItem itemTheme={setAddItemTheme} mainTheme={setMainTheme}/>
                    )}
                    {statisticTheme && (
                        <Statistic statisticTheme={setStatisticTheme} mainTheme={setMainTheme}/>
                    )}
                    {resetTheme && (
                        <Reset resetTheme={setResetTheme}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BudgetPage;