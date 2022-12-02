import {PROFILE} from "./options";

export const uploadData = async data => {
    // console.log(data)
    return (await PROFILE.post('/save', data)).data
}