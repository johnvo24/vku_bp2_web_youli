import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBar.module.css'

function SideBar({list}) {
    const [checker, setChecker] = useState(true)

    const handleHideName = (e) => {
        e.preventDefault()
        setChecker((prev) => prev = !prev)
    }

    return (
        <div className={styles.sideBar}>
            <ul type="none">
                {list.map((item, index) => (
                    <Link
                        key={index}
                        to={`/note/${item.alt}`}
                        // onClick={() => console.log("click")}
                    >
                        <li className={item.alt}>
                            <i className={item.icon}></i>
                            {checker && (<span>{ item.name }</span>)}
                        </li>
                    </Link>
                ))}
                <a href="null" onClick={handleHideName}>
                    <li>
                        <i className="fa-sharp fa-solid fa-eye-slash"></i>
                        {checker && (<span>Ẩn chữ</span>)}
                    </li>
                </a>
            </ul>
        </div>
    )
}

export default SideBar;