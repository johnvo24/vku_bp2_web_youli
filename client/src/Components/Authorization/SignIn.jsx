import React from 'react';

import styles from './Authorization.module.css'
import SnackBar from "../SnackBar";

export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <>
            <SnackBar
                open={true}
                style={{
                    backgroundColor: 'pink'
                }}>
                dds
            </SnackBar>
            <div className={styles.body}>
                <div className={styles.container}>
                    <p className={styles.header}>Sign In</p>
                    <div className={styles.fill}>
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
                        <button type='button' className={styles.signup} onClick={() => window.location.href='/sign-up'}>Don't have account ?</button>
                        <button type='button' className={styles.submit}>Sign In</button>
                    </div>
                </div>
            </div>
        </>

    )
}