import React, {useContext, useEffect, useState} from "react"

// import styles from './ViewCategory.module.css'
// // import {deleteCategory, viewCategories} from "../../../api/BudgetPageAPI";
// import * as GCONTENT from '../../../Constants/languages/GlobalWord'
// import {MyUserContext} from "../../../App";

export default function ViewCategory() {
    // const user = JSON.parse(localStorage.getItem('YoleUser'))
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(false)
    // const context = useContext(MyUserContext)

    // useEffect(() => {
    //     viewCategories(user.user_id)
    //         .then(res => {
    //             console.log(res)
    //             setData(res)
    //             setLoading(true)
    //         })
    // }, [])

    return (
        // <div className={styles.view}>
        //     {loading && (
        //         <table className={styles.table}>
        //             <tbody>
        //             <tr>
        //                 <th>Id</th>
        //                 <th>{GCONTENT.name[context[1]]}</th>
        //             </tr>
        //             {data.map(items => (
        //                 <tr
        //                     key={items.category_id}
        //                     className={styles.row}
        //                 >
        //                     <td className={styles.id}>{items.category_id}</td>
        //                     <td className={styles.name}>
        //                         <span
        //                             style={{color: items.type === 'cost' ? 'red' : 'green'}}
        //                         >{items.category_name}</span>
        //                         <div className={styles.iconGroup}>
        //                             <i
        //                                 className={`fa-solid fa-trash-can ${styles.icon}`}
        //
        //                             ></i>
        //                             <i
        //                                 className={`fa-solid fa-pen ${styles.icon}`}
        //                             ></i>
        //                         </div>
        //                     </td>
        //                 </tr>
        //             ))}
        //             </tbody>
        //         </table>
        //     )}
        // </div>
        <></>
    )

}
