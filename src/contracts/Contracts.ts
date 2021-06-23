import Web3 from 'web3'
import { Abis } from '../abis/Abis'
import { initWeb3 } from '../data/api/Api'
import { PROVIDER, CONTRACTS_ADDRESS } from "../utils/Constants"
const web3 = initWeb3()

const Contracts = {
    BNB: new new Web3(new Web3.providers.HttpProvider(PROVIDER)).eth.Contract(Abis.BnbAbi, CONTRACTS_ADDRESS.BNB),
    UP_NFT: new web3.eth.Contract(Abis.NFTAbi, CONTRACTS_ADDRESS.UP_NFT)
}

export default Contracts;