import {WALLET} from "./options";

export async function getWalletData(id) {
    // api
    // 0: good, 1: normal, 2: not good
    return (await WALLET.post('/inf', {user_id: id})).data
}