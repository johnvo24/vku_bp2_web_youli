import React, {useContext, useLayoutEffect, useState} from "react"

import styles from './Profile.module.css'
import * as CONTENT from '../../Constants/languages/Profile'
import {MyUserContext} from "../../App";
import {hasLoggedIn} from "../../Middlewares/Middlewares";
import SnackBar from "../../Components/SnackBar";
import BtnChooseFile from "../../Components/Pieces/Buttons/BtnChooseFile";
import {uploadData} from "../../api/ProfileAPI";

export default function Profile() {
    const context = useContext(MyUserContext)
    const user = JSON.parse(localStorage.getItem('YoleUser'))
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [file, setFile] = useState({})

    if (!hasLoggedIn()) {
        window.location.href = '/sign-in'
    }

    const onSubmit = () => {

        const formData = new FormData();
        formData.append('avatar_file', file);

        const items = {
            user_id: user.user_id,
            display_name:  user.display_name,
            user_email: document.getElementById('user_email').value,
            user_phone: document.getElementById('user_phone').value,
            user_biography: document.getElementById('user_bio').value,
            language: document.getElementById('user_language').value,
        }

        for(let key in items) {
            formData.append(key, items[key])
            console.log(`${key}: ${items[key]}`)
        }

        uploadData(formData)
            .then(res => {
                localStorage.setItem('YoleUser', JSON.stringify(res[0]))
                setMsg('Update Successful!')
                setOpen(true)
                setTimeout(() => {window.location.reload()}, 1500)
            })
            .catch(err => {
                setMsg(err.response.data)
                setOpen(true)
            })
    }

    const handleClickBtnChooseFile =(e) => {
        e.preventDefault();
        document.getElementById('avatar_file').click();
    }

    return (
        <div className={`${styles.main} g_scroll`}>
            <SnackBar
                duration={5000}
                open={open}
                setOpen={setOpen}
            >
                {msg}
            </SnackBar>

            <div className={styles.profile}>
                <h1 className={styles.header}>{CONTENT.header[context[1]]}</h1>
                <div className={styles.container}>
                    <div className={styles.avatar}>
                        <img className={styles.avatarImg} alt='avatar' src={`./resources/uploads/${user.user_avatar}`}/>
                    </div>
                    <div className={styles.group1} style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        marginTop: '-50px',
                        marginLeft: '100px',
                        marginBottom: '50px'
                    }}>
                        <label htmlFor='avatar_file' className="g_d_none">{CONTENT.avatar[context[1]]}</label>
                        <input type='file' id='avatar_file' className="g_d_none"
                               onChange={(e) => setFile(e.target.files[0])}/>
                        <BtnChooseFile
                            handleClickBtnChooseFile={handleClickBtnChooseFile}
                        />
                    </div>

                    <div className={styles.group2}>
                        <div className={styles.inputCtn} style={{width: '40%'}}>
                            <label htmlFor='user_name' className={styles.label}>{CONTENT.name[context[1]]}</label>
                            <input type='text' id='user_name' className={styles.input} defaultValue={user.username}/>
                        </div>
                        <div className={styles.inputCtn} style={{width: '60%'}}>
                            <label htmlFor='user_email' className={styles.label}>{CONTENT.email[context[1]]}</label>
                            <input type='text' id='user_email' className={styles.input} defaultValue={user.user_email}/>
                        </div>
                    </div>

                    <div className={styles.group2}>
                        <div className={styles.inputCtn} style={{width: '60%'}}>
                            <label htmlFor='user_phone' className={styles.label}>{CONTENT.phone[context[1]]}</label>
                            <input type='text' id='user_phone' className={styles.input} defaultValue={user.user_phone}/>
                        </div>
                        <div className={styles.inputCtn} style={{width: '40%'}}>
                            <label htmlFor='user_language'
                                   className={styles.label}>{CONTENT.language[context[1]]}</label>
                            <select className={styles.input} id='user_language'>
                                <option value='0' selected={user.language === 0}>English</option>
                                <option value='1' selected={user.language === 1}>Tiếng Việt</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.group1}>
                        <div className={styles.inputCtn} style={{width: '100%'}}>
                            <label htmlFor='user_bio' className={styles.label}>{CONTENT.biography[context[1]]}</label>
                            <textarea className={styles.input} id='user_bio' rows={6} style={{resize: 'none'}}  defaultValue={user.user_biography}/>
                        </div>
                    </div>

                    <div className={styles.btnGroup}>
                        <button type='button' className={styles.btn} onClick={onSubmit}>{CONTENT.save[context[1]]}</button>
                    </div>
                </div>
            </div>
        </div>
    )

}