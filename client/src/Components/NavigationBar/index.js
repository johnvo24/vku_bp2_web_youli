import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import { navList } from '../../Constants/GlobalVariables';
import { useState } from 'react';
import { getLanguage } from '../../Middlewares/Middlewares';

function NavigationBar() {
    const [render, setRender] = useState(false);
    const checkNav = (curNav) => {
        const curPage = window.location.pathname.split("/")[1];
        return (curNav === curPage)
            ? (true)
            : (false);
    }

    return (
        <div className={styles.nav}>
            <ul type="none">
                {navList.map((item, index) => (
                    <Link
                        key={index}
                        to={item.alt}
                        className={ checkNav(item.alt) ? styles.curNav : "" }
                        onClick={() => setRender(!render)}
                    >
                        <li><i className={item.icon}></i>{item.lang[getLanguage('YoleUser')]}</li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default NavigationBar