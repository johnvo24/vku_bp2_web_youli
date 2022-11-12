import React from "react"

import styles from './Authorization.module.css'
import SnackBar from "../SnackBar";
import {PostDataForSignUp} from "../../api/auth";
import {useState} from "react";

export default function SignUp() {
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)

    const handleSubmit = () => {
        const data = {
            username: document.getElementById('username').value,
            userpassword: document.getElementById('password').value,
            display_name: document.getElementById('name').value,
        }

        PostDataForSignUp(data)
            .then(res => setMsg(res.data))
            .catch(err => setMsg(err.response.data))
        setOpen(true)
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
            <div className={styles.body}>
                <div className={styles.container}>
                    <p className={styles.header}>Sign Up</p>
                    <div className={styles.fill}>
                        <div className={styles.input}>
                            <i className={`fa-solid fa-user ${styles.formIcon}`}></i>
                            <input type='text' placeholder='Enter Your Display Name' id='name'/>
                        </div>
                        <div className={styles.input}>
                            <i className={`fa-solid fa-key ${styles.formIcon}`}></i>
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
        </>
    )

}