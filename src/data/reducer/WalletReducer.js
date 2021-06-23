import { CONNECT_SOL_WALLET, CONNECT_WALLET, GET_CONNECTED_WALLET_ACC } from "../action/WalletAction"

const initState = {
    isWalletConnecting: false,
    myWalletAddress: "",

    //sol wallet
    isSolWalletConnecting: false,
    solWallet: undefined
}

export const WalletReducer = (state = initState, action) => {
    switch (action.type) {
        case CONNECT_WALLET.LOADING:
            return {
                ...state,
                isWalletConnecting: true
            }
        case CONNECT_WALLET.SUCCESS:
            window.location.reload()
            // return {
            //     ...state,
            //     isWalletConnecting: false,
            //     myWalletAddress: action.payload[0]
            // }
        case CONNECT_WALLET.ERROR:
            return {
                ...state,
                isWalletConnecting: false,
            }

        case GET_CONNECTED_WALLET_ACC.SUCCESS:
            var address = "";
            if (action.payload.length > 0) {
                address = action.payload[0]
            }
            return {
                ...state,
                myWalletAddress: address
            }

        case CONNECT_SOL_WALLET.LOADING:
            return {
                ...state,
                isSolWalletConnecting: true
            }
        case CONNECT_SOL_WALLET.SUCCESS:
            const connectedWallet = action.payload;
            console.log('Connected to wallet ' + connectedWallet.publicKey.toBase58())
            return {
                ...state,
                isSolWalletConnecting: false,
                myWalletAddress: connectedWallet.publicKey.toBase58(),
                solWallet: connectedWallet
            }
        case CONNECT_SOL_WALLET.ERROR:
            return {
                ...state,
                isSolWalletConnecting: false,
            }
        default:
            return state
    }
}