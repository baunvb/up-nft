import {combineReducers} from "redux";
import {WalletReducer} from "./WalletReducer"

export type AppState = {
    WalletReducer: any
    TokenPriceReducer: any
}

const AppReducer = combineReducers({
    WalletReducer,
})

export default AppReducer
