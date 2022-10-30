import styles from "./BudgetPage.module.css"
import {useEffect, useState} from "react";
import {getWalletData} from "../../api/BudgetPageAPI";

function BudgetPage(props) {
    const [wallet, setWallet] = useState({})

    useEffect(() => {
        async function fetch() {
            const data = await getWalletData(props.user.UID)
            setWallet(data)
        }
        fetch().then()
    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.container}>

                <h1 className={styles.title}>Your Wallet:</h1>
                <h1 className={styles.wallet}>{wallet.yourWallet}</h1>
            </div>
        </div>
    )
}

export default BudgetPage;