import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'
import "./home.css"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NftList from './component/list/NftList';

const Home: React.FC<{}> = () => {

    return (
        <div className="home">
            <span className="home-title">NFT Market Place</span>
            <NftList/>
        </div>
    )
}


export default Home
