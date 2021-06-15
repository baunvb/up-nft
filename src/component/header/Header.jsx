import React, { useEffect, useState } from 'react'
import ConnectWallet from '../connectwallet/ConnectWallet'
import { NavLink } from 'react-router-dom'

import "./header.css"
import { useSelector, useDispatch } from 'react-redux'
import { connectWallet, disConnectWallet, getWalletAddress } from '../../data/action/WalletAction'
import { formatShortWalletAddress } from '../../utils/Util'
import DialogComponent from '../dialog/Dialog'
import { FaCopy, FaExternalLinkAlt, FaTwitter } from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';
import Logo from "../../assets/images/logo.png"
import { Github, Twitter, Discord, Telegram } from 'react-bootstrap-icons';
import { FaTelegram, FaMediumM, FaDiscord } from 'react-icons/fa';

export default function Header() {
    const dispatch = useDispatch();
    const ConnectWalletState = useSelector(state => state.WalletReducer)
    const [open, setOpen] = useState(false)
    const [copyTooltip, setCopyToolTip] = useState("Copy")
    const [openAccount, setOpenAccount] = useState(false)

    useEffect(() => {
        dispatch(getWalletAddress())
    }, [])

    return (
        <div className="header">
            {open ? <ConnectWallet open={open} onClose={() => setOpen(false)} /> : null}
            {
                openAccount &&
                <DialogComponent
                    title="Account"
                    open={openAccount}
                    onClose={() => setOpenAccount(false)}
                >
                    <div className="header-detail-account">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Connected</span>
                            <button className="header-btn-change btn-active"
                                onClick={() => {
                                    setOpen(true)
                                    setOpenAccount(false)
                                }}
                            >Change</button>
                        </div>
                        <span className="header-wallet-address">{formatShortWalletAddress(ConnectWalletState.myWalletAddress)}</span>
                        <div className="header-wallet-copy">
                            <Tooltip title={copyTooltip}>
                                <span style={{ display: "inline-block", marginRight: "20px" }}
                                    onClick={() => {
                                        navigator.clipboard.writeText(ConnectWalletState.myWalletAddress)
                                        setCopyToolTip("Copied")
                                    }}
                                    onMouseLeave={() => setCopyToolTip("Copy")
                                    }
                                >
                                    <span className="header-wallet-icon-action"><FaCopy /></span>
                                Copy
                            </span>
                            </Tooltip>

                            <a className="header-wallet-icon-action" href={"https://etherscan.io/address/" + ConnectWalletState.myWalletAddress} target="_blank">
                                <span className="header-wallet-icon-action"><FaExternalLinkAlt /></span>
                                View on Etherscan
                            </a>
                        </div>
                    </div>
                </DialogComponent>
            }
            <NavLink className="header-left" to={"/"}>
                <img src={Logo} alt=""/>
                <span className="header-page-title">
                    <span>UPFI</span>
                    <span>Network</span>
                </span>
            </NavLink>
            <div className="header-center">
                <a href="/" target="_blank" className="header-social"><FaMediumM/></a>
                <a href="/" target="_blank" className="header-social"><Twitter/></a>
                <a href="/" target="_blank" className="header-social"><FaDiscord/></a>
                <a href="/" target="_blank" className="header-social"><Telegram/></a>
                <a href="/" target="_blank" className="header-social"><Github/></a>

            </div>
            <div className="header-right">
                {
                    ConnectWalletState.myWalletAddress ?
                        <div className="header-wallet"
                            onClick={() => setOpenAccount(true)}
                        >
                            <span className="header-wallet-address">{formatShortWalletAddress(ConnectWalletState.myWalletAddress)}</span>
                            <span className="header-wallet-icon"></span>
                        </div> :
                        <button className="header-connect"
                            onClick={() => setOpen(true)}
                        >
                            Connect my wallet
                </button>
                }
            </div>

        </div>
    )
}