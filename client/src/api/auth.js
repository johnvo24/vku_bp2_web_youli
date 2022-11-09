import {AUTH} from "./options";

export async function PostDataForSignin(data) {

    return (await AUTH.post('/signin', data)).data.user

}

export async function PostDataForSignUp(data) {

    return (await AUTH.post('signup', data)).data.user

}