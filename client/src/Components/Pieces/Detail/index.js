import styles from './Detail.module.css'

function Detail({children}) {
    return (
        <div className={styles.detail}>
            <div className={styles.detailContainer}>
                <div className={styles.detailContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Detail;