import React, {useEffect} from "react"

import styles from './Authorization.module.css'
import SnackBar from "../SnackBar";
import {PostDataForSignUp} from "../../api/auth";
import {useState} from "react";
import GGOAUTH from "./GGOAUTH";

export default function SignUp() {
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem('YoleUser'))

    useEffect(() => {
        if (user)
            window.location.href = '/home'
    }, [])

    const handleSubmit = () => {
        const data = {
            username: document.getElementById('username').value,
            userpassword: document.getElementById('password').value,
            display_name: document.getElementById('name').value,
        }

        PostDataForSignUp(data)
            .then(res => {
                setMsg(res.data)
                setOpen(true)
            })
            .catch(err => {
                setMsg(err.response.data)
                setOpen(true)
            })

    }

    const focusin = e => {
        e.target.parentElement.querySelector('label').classList.add(styles.active);
    }

    const exit = e => {
        if (e.target.value === '')
            e.target.parentElement.querySelector('label').classList.remove(styles.active);
    }

    return (
        <>
            <SnackBar
                open={open}
                setOpen={setOpen}
                style={{
                    backgroundColor: 'pink'
                }}
                duration={5000}
            >
                {msg}
            </SnackBar>
            <div className={styles.main}>
                <div className={styles.body + " g_scroll"}>
                    <div className={styles.container}>
                        <div className={"g_header"}>Sign Up</div>
                        <img src='/resources/images/YoleLogo.png' alt='logo' className={styles.logo}/>
                        <GGOAUTH open={setOpen} msg={setMsg}/>
                        <p className={styles.or}>-Or-</p>
                        <div className={styles.fill}>
                            <div className={styles.input}>
                                <label htmlFor="name" className={styles.label}>DISPLAY NAME</label>
                                <input
                                    type='text'
                                    id='name'
                                    onFocus={focusin}
                                    onBlur={exit}
                                    defaultValue=''
                                />
                            </div>
                            <div className={styles.input}>
                                <label htmlFor="username" className={styles.label}>USER NAME</label>
                                <input
                                    type='text'
                                    id='username'
                                    onFocus={focusin}
                                    onBlur={exit}
                                    defaultValue=''
                                />
                            </div>
                            <div className={styles.input}>
                                <label htmlFor="password" className={styles.label}>PASSWORD</label>
                                <input
                                    type='password'
                                    id='password'
                                    onFocus={focusin}
                                    onBlur={exit}
                                    defaultValue=''
                                />
                            </div>
                        </div>
                        <div className={styles.btnGroup}>
                            <button type='button' className={styles.signup}
                                    onClick={() => window.location.href = '/sign-in'}>Already have account ?
                            </button>
                            <button type='button' className={styles.submit} onClick={handleSubmit}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}