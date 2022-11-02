import styles from './Container.module.css'

export default function Container(props) {

    return (
        <>
            <div className={styles.container}
                 style={props.customStyles}
            >
                {props.children}
            </div>
        </>
    )

}