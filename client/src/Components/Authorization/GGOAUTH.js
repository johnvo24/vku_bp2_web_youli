import React from 'react';
import {useScript} from "../../hooks";
import jwt_decode from "jwt-decode";
import {PostDataForSignin, PostDataForSignUp} from "../../api/auth";
import styles from './Authorization.module.css'

export default function GGOAUTH(props) {

    function handleCallbackResponse(r) {
        const decode = jwt_decode(r.credential)
        console.log(decode)

        if (props.mode === 0)
            PostDataForSignin({
                username: decode.email,
                userpassword: decode.sub
            })
                .then(res => {
                    localStorage.setItem('YoleUser', JSON.stringify(res.data))
                    window.location.href = '/home'
                })
                .catch(err => {
                    props.msg(err.response.data)
                    props.open(true)
                })
        else
            PostDataForSignUp({
                username: decode.email,
                userpassword: decode.sub,
                display_name: decode.name,
                avatar: decode.picture
            })
                .then(res => {
                    props.msg(res.data)
                    props.open(true)
                })
                .catch(err => {
                    props.msg(err.response.data)
                    props.open(true)
                })
    }

    const clientId = '920392196448-cctj9kgqfd9bhhl2cd06u4552b8gver3.apps.googleusercontent.com'

    useScript('https://accounts.google.com/gsi/client', () => {
        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCallbackResponse
        })

        window.google.accounts.id.renderButton(
            document.getElementById('buttonGG'),
            {
                theme: 'outline',
                size: 'medium',
                type: 'button',
                text: props.mode === 0 ? "signin_with" : 'signup_with',
                shape: 'pill',
                width: '140px'
            })
    })

    return (
        <div id='buttonGG' className={styles.logo} style={{marginTop: '20px'}}>
        </div>
    )

}