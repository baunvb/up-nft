import React, { useState, useEffect } from 'react'
import DialogComponent from '../dialog/Dialog'
import MetaMaskLogo from '../../assets/images/metamask_logo.png'

import { useSelector, useDispatch } from 'react-redux'
import "./connectwallet.css"
import { connectWallet } from '../../data/action/WalletAction'
import Loading from '../loading/Loading'
import { CONNECT_SOL_WALLET } from "../../data/action/WalletAction"

function ItemConnecWallet(props) {
    return (
        <div className="item-connect-wallet"
            onClick={() => props.action()}
        >
            <span>{props.name}</span>
            <img alt="" src={props.logo} />
        </div>
    )
}

export default function ConnectWallet(props) {
    const [selectedWallet, setSelectedWallet] = useState(undefined);

    const dispatch = useDispatch();
    const ConnectWalletState = useSelector(state => state.WalletReducer)
    //metamask 
    const connectMetaMask = () => {
        if (ConnectWalletState.isWalletConnecting) return
        const isMetaMaskInstalled = () => {
            const { ethereum } = window;
            return Boolean(ethereum && ethereum.isMetaMask);
        };

        const connect = () => {
            const { ethereum } = window;
            dispatch(connectWallet(ethereum))
        };

        const MetaMaskClientCheck = () => {
            if (!isMetaMaskInstalled()) {
                alert("Please install metamask extension")
            } else {
                connect()
            }
        };

        MetaMaskClientCheck();
    };

    useEffect(() => {
        if (selectedWallet) {
            dispatch({ type: CONNECT_SOL_WALLET.LOADING })
            selectedWallet.on('connect', () => {
                //save to redux
                dispatch({ type: CONNECT_SOL_WALLET.SUCCESS, payload: selectedWallet })
            });
            selectedWallet.on('disconnect', () => {
            });
            selectedWallet.on('connecte', () => {
            });
            selectedWallet.connect();
            return () => {
                selectedWallet.disconnect();
            };
        }
    }, [selectedWallet]);

    return (
        <DialogComponent
            open={props.open}
            onClose={() => props.onClose()}
            title={"Connect to a wallet"}
        >
            <div>
                <ItemConnecWallet
                    name="MetaMask"
                    logo={MetaMaskLogo}
                    action={() => {
                        props.onClose()
                        connectMetaMask()
                    }}
                />

                {/* <ItemConnecWallet
                    name="SolWallet"
                    logo={SolWalletLogo}
                    action={() => setSelectedWallet(urlWallet)}

                /> */}
                {
                    (ConnectWalletState.isWalletConnecting || ConnectWalletState.isSolWalletConnecting) &&
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}>
                        <Loading />
                    </div>
                }

            </div>
        </DialogComponent>
    )
}