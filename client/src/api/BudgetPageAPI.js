import axios from "axios"
import {WALLET} from "./options";

export async function getWalletData(id) {
    // api
    // 0: good, 1: normal, 2: not good
    WALLET.get('/get')
        .then(res => l)
}