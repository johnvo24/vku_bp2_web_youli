import styles from "./BudgetPage.module.css"
import {useEffect, useState} from "react";
import {getWalletData, updateTimeToServer} from "../../api/BudgetPageAPI";
import {useClock} from "../../hooks";
import * as CONTENT from "../../Constants/languages/Expenditure";
import {useContext} from "react";
import {MyUserContext} from "../../App";

function BudgetPage(props) {
    const [wallet, setWallet] = useState({})
    const [time] = useClock(Number(sessionStorage.getItem('z')))
    const data = useContext(MyUserContext)

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
                    <div className={styles.circleBar}>
                        <div className={styles.lineUp}/>
                        <div className={styles.lineDown}/>
                        <div className={styles.yourWallet}>
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
                </div>
            </div>
        </div>
    )
}

export default BudgetPage;