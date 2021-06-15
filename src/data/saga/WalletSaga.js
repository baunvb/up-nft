import { put, takeLatest } from "redux-saga/effects";
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';

import * as Api from "../api/Api"
import { CONNECT_SOL_WALLET, CONNECT_WALLET, DISCONNECT_WALLET, GET_CONNECTED_WALLET_ACC } from "../action/WalletAction"
function* connectMetaMaskWallet(action) {
    try {
        yield put({ type: CONNECT_WALLET.LOADING })
        let payload = yield Api.connectMetaMaskWallet(action.payload)
        yield put({ type: CONNECT_WALLET.SUCCESS, payload })
    } catch {
        yield put({ type: CONNECT_WALLET.ERROR, payload: "Can not connect Metamask wallet" })
    }
}

function* disConnectWallet() {
    let payload = yield Api.disconnectMetaMaskWallet();
}

function* getWalletAddress() {
    try {
        yield put({ type: GET_CONNECTED_WALLET_ACC.LOADING })
        let payload = yield Api.getWalletAddress()
        yield put({ type: GET_CONNECTED_WALLET_ACC.SUCCESS, payload })
    } catch {
        yield put({ type: GET_CONNECTED_WALLET_ACC.ERROR, payload: "Can not get wallet address" })
    }
}


export default function* walletSaga() {
    yield takeLatest(CONNECT_WALLET.actionName, connectMetaMaskWallet)
    yield takeLatest(GET_CONNECTED_WALLET_ACC.actionName, getWalletAddress)
    yield takeLatest(DISCONNECT_WALLET.actionName, disConnectWallet)
}