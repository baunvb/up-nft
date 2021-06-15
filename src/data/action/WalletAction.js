import {createActionSet} from "../../utils/ActionHelper"

export const CONNECT_WALLET = createActionSet("CONNECT_WALLET")
export const DISCONNECT_WALLET = createActionSet("DISCONNECT_WALLET")

export const GET_CONNECTED_WALLET_ACC = createActionSet("GET_CONNECTED_WALLET_ACC")

export const connectWallet = payload => ({
    type: CONNECT_WALLET.actionName,
    payload: payload
})

export const disConnectWallet = () => ({
    type: DISCONNECT_WALLET.actionName
})


export const getWalletAddress = () => ({
    type: GET_CONNECTED_WALLET_ACC.actionName
})

// solwallet
export const CONNECT_SOL_WALLET = createActionSet("CONNECT_SOL_WALLET")
