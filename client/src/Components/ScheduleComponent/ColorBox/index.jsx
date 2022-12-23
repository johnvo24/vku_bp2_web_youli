import styles from './ColorBox.module.css'
import {COLORS} from "../../../Constants/GlobalVariables";
import {useState} from "react";
import ColorSquare from "../ColorSquare";

export default function ColorBox({handleClickColorSquare}) {
    return (
        <>
            <div className={styles.gridContainer}>
                {COLORS.map((items, id) => (
                    <ColorSquare
                        key={id}
                        onClick={() => handleClickColorSquare(items)}
                        bg={items.task_color}
                        text={items.task_text_color}
                    />
                ))}
            </div>
        </>
    )

}