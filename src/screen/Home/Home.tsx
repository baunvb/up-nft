import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'

import "./home.css"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MarketPlace from './component/list/MarketPlace';
import { MarkunreadOutlined } from '@material-ui/icons';
import { getSelectedAddress } from '../../data/api/Api';
import { isValidNetwork } from '../../utils/Util';
import ErrorNetwork from '../../component/error/ErrorNetwork';
import ErrorWallet from '../../component/error/ErrorWallet';

const Home: React.FC<{}> = () => {
    const [isValidNet, setIsValidNet] = useState(false)
    const ConnectWalletState = useSelector((state: any) => state.WalletReducer)
    useEffect(() => {
        const fetchData = async () => {
            //check is valid network first
            const isValid = await isValidNetwork()
            setIsValidNet(isValid)
        }
        fetchData()
    }, [ConnectWalletState])

    if (!Boolean(getSelectedAddress())) {
        return <ErrorWallet/>
    }

    if (!isValidNet) {
        return <ErrorNetwork />
    }

    return (
        <div className="home">
            <span className="home-title">NFT Market Place</span>
            <MarketPlace />
        </div>
    )
}


export default Home
