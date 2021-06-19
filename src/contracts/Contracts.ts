import Web3 from 'web3'
import { Abis } from '../abis/Abis'
import { getSelectedAddress, initWeb3 } from '../data/api/Api'
import { PROVIDER, ROPSTEN_PROVIDER } from "../utils/Constants"
const web3 = initWeb3()

const CONTRACTS_ADDRESS = {
    BNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    UP_NFT: "0xc57898e22b632047a3a7041eb77fc7c74ff24957"
}

const Contracts = {
    BNB: new new Web3(new Web3.providers.HttpProvider(PROVIDER)).eth.Contract(Abis.BnbAbi, CONTRACTS_ADDRESS.BNB),
    UP_NFT: new web3.eth.Contract(Abis.NFTAbi, CONTRACTS_ADDRESS.UP_NFT),
}

export default Contracts;