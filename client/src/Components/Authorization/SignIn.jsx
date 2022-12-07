import React, {useEffect, useState} from 'react';

import styles from './Authorization.module.css'
import SnackBar from "../SnackBar";
import {PostDataForSignin} from "../../api/auth";

export default function SignIn() {
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('YoleUser') !== null)
            window.location.href = '/home'
    }, [])

    const handleSubmit = () => {
        const data = {
            username: document.getElementById('username').value,
            userpassword: document.getElementById('password').value
        }

        PostDataForSignin(data)
            .then(res => {
                localStorage.setItem('YoleUser', JSON.stringify(res.data))
                window.location.href = '/home'
            })
            .catch(err => {
                setMsg(err.response.data)
                setOpen(true)
            })


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
            <div className={styles.bodyContainer}>
                <div className={styles.body}>
                    <div className={styles.container}>
                        <div className={"g_header"}>Sign In</div>
                        <div className={styles.fill}>
                            <div className={styles.input}>
                                <i className={`fa-solid fa-user ${styles.formIcon}`}></i>
                                <input type='text' placeholder='Enter Your Username' id='username' defaultValue=''/>
                            </div>
                            <div className={styles.input}>
                                <i className={`fa-solid fa-key ${styles.formIcon}`}></i>
                                <input type='password' placeholder='Enter Your Password' id='password' defaultValue=''/>
                            </div>
                        </div>
                        <div className={styles.btnGroup}>
                            <button type='button' className={styles.signup}
                                    onClick={() => window.location.href = '/sign-up'}>Don't have account ?
                            </button>
                            <button type='button' className={styles.submit} onClick={handleSubmit}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}