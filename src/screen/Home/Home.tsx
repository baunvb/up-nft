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
    const ConnectWalletState = useSelector((state: any) => state.WalletReducer)
    useEffect(() => {
        const fetchData = async () => {
        }
        fetchData()
    }, [ConnectWalletState])

    return (
        <div className="home">
            <span className="home-title">NFT Marketplace</span>
            <MarketPlace />
        </div>
    )
}


export default Home
