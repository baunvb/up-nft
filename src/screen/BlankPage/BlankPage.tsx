import React from 'react'
import "./blank.css"
import { Github, Twitter, Telegram } from 'react-bootstrap-icons';
import { FaMediumM, FaDiscord, FaExclamationCircle } from 'react-icons/fa';
import Logo from "../../assets/images/logo.png"
const BlankPage: React.FC<{}> = () => {
    return (
        <div className="blank">
            <div className="blank-header">
                <div className="header-left">
                    <img src={Logo} alt="" />
                    <span className="header-page-title">
                        <span>HEROFI</span>
                        <span>Network</span>
                    </span>
                </div>
                <div className="header-center">
                    <a href="/" target="_blank" className="header-social"><FaMediumM /></a>
                    <a href="/" target="_blank" className="header-social"><Twitter /></a>
                    <a href="/" target="_blank" className="header-social"><FaDiscord /></a>
                    <a href="/" target="_blank" className="header-social"><Telegram /></a>
                    <a href="/" target="_blank" className="header-social"><Github /></a>
                </div>
            </div>
            <div className="blank-content">
                <span className="blank-text1">
                    <span><FaExclamationCircle size={25} color="#ff0000"/></span>
                    <span>Connect wallet error No Ethereum provider was found on window.ethereum. </span>
                </span>
                <a className="blank-text2" target="_blank" href="https://metamask.io/download.html">Install Metamask</a>
            </div>
        </div>
    )
}

export default BlankPage