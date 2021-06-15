import Web3 from 'web3'
import { COINGECKO_API, tokenCgkIdMap } from '../../utils/Constants';
declare const window: any;

//connect wallet api
export const connectMetaMaskWallet = async (ethereum: any) => {
    // const account = await getWalletAddress();
    // if(account.length == 0) {
        return await ethereum.request({ method: 'eth_requestAccounts' });
    // }
}

export const disconnectMetaMaskWallet = async () => {
    return await window.web3.currentProvider.disconnect()
}

export const getWalletAddress = async () => {
    //get metamask address connected 

    // let web3;
    // if (window.ethereum) {
    //     web3 = new Web3(window.ethereum);
    // } else if (window.web3) {
    //     web3 = new Web3(window.web3.currentProvider);
    // };
    // return await web3.eth.getAccounts()
}
