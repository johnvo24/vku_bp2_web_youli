import styles from './ColorBox.module.css'
import {COLOR_COLUMN, COLOR_ROW, COLORS} from "../../../Constants/GlobalVariables";
import {useLayoutEffect, useState} from "react";
import ColorSquare from "../ColorSquare";

export default function ColorBox(props) {
    const[color, setColor] = useState({
        task_color: '',
        task_text_color: ''
    })

    return (
        <>
            <div>{color.task_color}</div>
            <div className={styles.gridContainer}>
                {COLORS.map((items, id) => (
                    <ColorSquare
                        key={id}
                        onClick={() => setColor(items)}
                        bg={items.task_color}
                        text={items.task_text_color}
                    />
                ))}
            </div>
        </>
    )

}