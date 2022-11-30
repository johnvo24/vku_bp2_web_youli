import {WALLET} from "./options";
import {SYSTEM_CATEGORY} from "../Constants/GlobalVariables";

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
    if(name.includes(SYSTEM_CATEGORY))
        data = {...data, category_id: id}
    else
        data = {...data, c_category_id: id}
    await WALLET.post('/item/submit', data)
    // console.log(data)
}

export async function getBills(walletId) {
    return (await WALLET.post('/bill', {wallet_id: walletId})).data //array
}

export async function addCategory(data) {
    return (await WALLET.post('/category/add', data)).data
}

export async function statistic(walletId) {
    return (await WALLET.post('/bill/statistic', {wallet_id: walletId})).data //array
}

export async function totalCost(walletId) {
    return (await WALLET.post('/bill/total', {wallet_id: walletId})).data.total
}

export async function deleteWithRefund(data, name, id) {
    // console.log(data)
    if(name.includes(SYSTEM_CATEGORY))
        data = {...data, category_id: id}
    else
        data = {...data, c_category_id: id}
    // console.log(data)
    await WALLET.post('/bill/delete/refund', data)
}

export async function deleteWithoutRefund(data) {
    await WALLET.post('/bill/delete', {bill_id: data})
}

export async function viewCategories(user_id) {
    return (await WALLET.post('/category/view', {user_id: user_id})).data //array
}

export async function deleteCategory(cate_id) {
    return await WALLET.post('/category/delete', {category_id: cate_id})
}

export async function renameCategory(cate_id, cate_name) {
    return await WALLET.post('/category/rename', {category_id: cate_id, category_name: cate_name})
}