import styles from "./BudgetPage.module.css"
import {useEffect, useState} from "react";
import {getWalletData, updateTimeToServer} from "../../api/BudgetPageAPI";
import {useClock} from "../../hooks";
import * as CONTENT from "../../Constants/languages/Expenditure";
import {useContext} from "react";
import {MyUserContext} from "../../App";
import '../../Components/GlobalStyle'
import Container from "../../Components/Container";

function BudgetPage(props) {
    const [wallet, setWallet] = useState({})
    const [time] = useClock(Number(sessionStorage.getItem('z')))
    const data = useContext(MyUserContext)
    const [mainTheme, setMainTheme] = useState(true)
    const [walletTheme, setWalletTheme] = useState(false)
    const [statisticTheme, setStatisticTheme] = useState(false)
    const [addItemTheme, setAddItemTheme] = useState(false)
    const [resetTheme, setResetTheme] = useState(false)
    const [isEdit, setEdit] = useState({
        balance: false,
        income: false
    })

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

    const updateTime = async () => {
        await updateTimeToServer(time)
    }

    window.addEventListener('pagehide', updateTime)

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
                                <div className={styles.statistic}>
                                    <i className="fa-solid fa-chart-pie" style={{fontSize: '4.5em'}}></i>
                                </div>
                                <div className={styles.addItem}>
                                    <i className="fa-solid fa-cart-plus" style={{fontSize: '4.5em'}}></i>
                                </div>
                                <div className={styles.reset}>
                                    <i className="fa-solid fa-rotate-right" style={{fontSize: '4.5em'}}></i>
                                </div>
                                <div className={styles.dot}/>
                            </div>
                        </>
                    )}

                    {walletTheme && (
                        <>
                            <div className={styles.walletTheme}>
                                <Container customStyles={{
                                    border: '1px solid red',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div className={styles.balance}>
                                        <label className={styles.walletTitle}
                                               htmlFor='balance'>{CONTENT.balance[data[1]]}</label>
                                        {isEdit.balance ?
                                            (
                                                <>
                                                    <input type='text' id='balance' className={styles.walletEditor}
                                                           defaultValue={wallet.yourWallet}/>
                                                </>
                                            ) :
                                            (
                                                <>
                                                    <label
                                                        className={styles.walletTitle}>{`${wallet.yourWallet}$`}</label>
                                                </>
                                            )}
                                    </div>
                                    <div className={styles.income}>
                                        <label className={styles.walletTitle}>{CONTENT.income[data[1]]}</label>
                                        {isEdit.income ?
                                            (
                                                <>
                                                    <input type='text' id='income' className={styles.walletEditor}
                                                           defaultValue={wallet.income}/>
                                                </>
                                            ) :
                                            (
                                                <>
                                                    <label className={styles.walletTitle}>{`${wallet.income}$`}</label>
                                                </>
                                            )}
                                    </div>
                                    <div className={styles.bank}>
                                        <h1 className={styles.walletTitle}>{CONTENT.bank[data[1]]}</h1>
                                    </div>
                                </Container>
                            </div>
                        </>
                    )}
                </div>


            </div>
        </div>
    )
}

export default BudgetPage;