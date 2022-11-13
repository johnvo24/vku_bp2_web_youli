import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css'
import './SideBar.css';
import axios from 'axios';

function SideBar({ list }) {
    const [checker, setChecker] = useState(true)

    const handleHideName = (e) => {
        e.preventDefault()
        setChecker((prev) => prev = !prev)
    }

    const handleClick = (e, alt) => {
        e.preventDefault();
        switch (alt) {
            case "view":
                axios.get('/api/notebox/create')
                    .then((res) => {
                        console.log(res)
                    })
                break;

            default:
                break;
        }
    }

    return (
        <div className={styles.sideBar}>
            <ul type="none">
                {list.map((item, index) => (
                    <Link
                        key={index}
                        to={`/note/${item.alt}`}
                        onClick={(e) => handleClick(e, item.alt)}
                    >
                        <li className={item.alt}>
                            <i className={item.icon}></i>
                            {checker && (<span>{item.name}</span>)}
                        </li>
                    </Link>
                ))}
                <a href="null" onClick={handleHideName}>
                    <li className='btn_toggle'>
                        <i className="fa-sharp fa-solid fa-eye-slash"></i>
                        {checker && (<span>Ẩn chữ</span>)}
                    </li>
                </a>
            </ul>
        </div>
    )
}

export default SideBar;