import {WALLET} from "./options";

export async function getWalletData(id) {
    // api
    // 1: good, 2: normal, 3: not good
    return (await WALLET.post('/inf', {user_id: id})).data
}

export async function updateWalletBudget(walletId, budget) {
    await WALLET.post('/update', {wallet_id: walletId, budget: budget})
}