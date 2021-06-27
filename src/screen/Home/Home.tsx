import React from 'react'
import "./home.css"
import MarketPlace from './component/list/MarketPlace';

const Home: React.FC<{}> = () => {
    return (
        <div className="home">
            <span className="home-title">NFT Marketplace</span>
            <MarketPlace />
        </div>
    )
}


export default Home
