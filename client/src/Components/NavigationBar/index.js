import { Link } from 'react-router-dom'
import {useEffect, useLayoutEffect, useState} from 'react';
import styles from './NavigationBar.module.css'
import { navList } from '../../Constants/GlobalVariables';

function NavigationBar() {
    const [navLists, setNavList] = useState(navList ?? [])

    useLayoutEffect(() => {
        const initPage = window.location.pathname.split("/")[1]
        const obj = {index: 2};
        for(let i = 0; i < 5; i += 1) {
            (initPage === navLists[i].alt) && ((obj.index = i) && (i = 5))
        }
        handleClick(obj.index)
    }, [])

    const handleClick = (index) => {
        const delta = 2 - index

        const arr = []
        
        if(delta >= 0) {
            for(let i = 0; i < 5; i += 1) {
                arr[(i + delta) % 5] = navLists[i]
            }
        }else {
            for(let i = 0; i < 5; i += 1) {
                arr[i] = navLists[(i - delta) % 5]
            }
        }
        setNavList([...arr])
    } 
    
    return (
        <div className={styles.nav}>
            <ul type="none">
                {navLists.map((item, index) => (
                    <Link
                        key={index}
                        to={item.alt}
                        className={index === 2 ? styles.currentPage : styles.sidePage}
                        onClick={() => handleClick(index)}
                    >
                        <li>{ item.name }</li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default NavigationBar