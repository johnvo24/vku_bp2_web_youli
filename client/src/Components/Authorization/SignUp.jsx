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
        if(user)
            window.location.href='/home'
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
                    <div className={styles.container} style={{
                        height: '430px'
                    }}>
                        <div className={"g_header"}>Sign Up</div>
                        <GGOAUTH open={setOpen} msg={setMsg}/>
                        <div className={styles.fill}>
                            <div className={styles.input}>
                                <i className={`fa-solid fa-signature ${styles.formIcon}`}></i>
                                <input type='text' placeholder='Enter Your Display Name' id='name'/>
                            </div>
                            <div className={styles.input}>
                                <i className={`fa-solid fa-user ${styles.formIcon}`}></i>
                                <input type='text' placeholder='Enter Your Username' id='username'/>
                            </div>
                            <div className={styles.input}>
                                <i className={`fa-solid fa-key ${styles.formIcon}`}></i>
                                <input type='password' placeholder='Enter Your Password' id='password'/>
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