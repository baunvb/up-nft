import {AbiItem} from "web3-utils"

export const Abis = {
    ERC20Abi: require("./abi/erc20.json") as AbiItem[],
    IronAbi: require("./abi/iron.json") as AbiItem[],
    SteelAbi: require("./abi/steel.json") as AbiItem[],
}