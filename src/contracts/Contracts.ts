import Web3 from 'web3'
import { Abis } from '../abis/Abis'
import { initWeb3 } from '../data/api/Api'
import { PROVIDER, ROPSTEN_PROVIDER } from "../utils/Constants"
const web3 = initWeb3()

const CONTRACTS_ADDRESS = {
    BNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    UP_NFT: "0xd3c278ea1c9756434ca9AEFd9D74C6c861C10f0a"
}

const Contracts = {
    BNB: new new Web3(new Web3.providers.HttpProvider(PROVIDER)).eth.Contract(Abis.BnbAbi, CONTRACTS_ADDRESS.BNB),
    UP_NFT: new web3.eth.Contract(Abis.NFTAbi, CONTRACTS_ADDRESS.UP_NFT)
}

export default Contracts;