import {WALLET} from "./options";

export async function getWalletData(id) {
    // 1: good, 2: normal, 3: not good
    return (await WALLET.post('/inf', {user_id: id})).data
}

export async function updateWalletBudget(walletId, budget) {
    await WALLET.post('/update', {wallet_id: walletId, budget: budget})
}

export async function getCategory(userId) {
    return (await WALLET.post('/categories', {user_id: userId})).data // array
}

export async function submitItemForm(data, name, id) {
    if(name === 'market' || name === 'salary' || name === 'monthly home fee')
        data = {...data, category_id: id}
    else
        data = {...data, c_category_id: id}
    await WALLET.post('/item/submit', data)
    // console.log(data)
}