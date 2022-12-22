import styles from './ColorSquare.module.css'

export default function ColorSquare(props) {

    return (
        <div
            className={styles.gridItem}
            style={{
                backgroundColor: props.bg,
                color: props.text
            }}
            onClick={props.onClick}
        />
    )

}