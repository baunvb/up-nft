import {AbiItem} from "web3-utils"

export const Abis = {
    ERC20Abi: require("./abi/erc20.json") as AbiItem[],
    BnbAbi: require("./abi/bnb.json") as AbiItem[],
    NFTAbi: require("./abi/up_abi.json") as AbiItem[],
}