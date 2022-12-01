import {AUTH} from "./options";

export async function PostDataForSignin(data) {
    // console.log(data)
    return (await AUTH.post('/sign-in', data))

}

export async function PostDataForSignUp(data) {
    return (await AUTH.post('/sign-up', data))
}