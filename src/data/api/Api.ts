import { Web } from '@material-ui/icons';
import Web3 from 'web3'
import { COINGECKO_API, MAINNET_PROVIDER, tokenCgkIdMap } from '../../utils/Constants';

declare const window: any;

//connect wallet api
export const connectMetaMaskWallet = async (ethereum: any) => {
    const account = await getWalletAddress();
    if (account.length == 0) {
        return await ethereum.request({ method: 'eth_requestAccounts' });
    }
}

export const disconnectMetaMaskWallet = async () => {
    // return await window.web3.currentProvider.disconnect()
    console.log("Request diconnect")
}

export const getWalletAddress = async () => {
    //get metamask address connected 

    let web3;
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    };
    return await web3.eth.getAccounts()
}

export const initWeb3 = () => {
    let web3: Web3;
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider)
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider(MAINNET_PROVIDER))
    }
    return web3

}

export const getSelectedAddress = () => {
    return window.ethereum.selectedAddress
}

export const listenChainChanged = (ethereum: any) => {
    ethereum.on('chainChanged', (chainId: string) => window.location.reload());
}

export const listenDisconnect = (ethereum: any) => {
    ethereum.on('disconnect', () => window.location.reload());
}
