import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from "react-dom";
import { Transaction } from "ethereumjs-tx"
import "./detail.css"
import * as THREE from "three";
import { NavLink } from 'react-router-dom'
import { Nft } from '../../utils/Type';
import Web3 from 'web3'
import { getSelectedAddress, initWeb3 } from '../../data/api/Api';
import { AbiItem } from 'web3-utils';
import Contracts from '../../contracts/Contracts';
import { formatCurrency, getDetailCategory, _artIdToCategoryId, unit256ToNumber, getCategoryData, mintArtByCategoryId, formatShortWalletAddress, getAmountCategory, getAmountNFT, ownerOfNft, getBalanceOfConnectedWallet, getCurrentChainId, isValidNetwork } from '../../utils/Util';
import { nthArg } from 'lodash';
import Loading from '../../component/loading/Loading';
import { FaExternalLinkAlt } from 'react-icons/fa';
import DialogComponent from '../../component/dialog/Dialog';
import { NETWORK } from '../../utils/Constants';
import ErrorNetwork from '../../component/error/ErrorNetwork';
import ErrorWallet from '../../component/error/ErrorWallet';
import ImageLoader from '../../component/imageloader/ImageLoader';

declare const window: any;

const CURRENT_NETWORK = process.env.REACT_APP_ETHEREUM_NETWORK == "BSC_MAINNET" ? NETWORK["BSC_MAINNET"] : NETWORK["BSC_TESTNET"]



const Detail: React.FC<Nft> = () => {
    const [nft, setNft] = useState<Nft>(null)
    const [isLoading, setLoading] = useState(false)
    const [isTxLoading, setTxLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [mintingResult, setMintingResult] = useState({ isSuccess: Boolean, message: String })
    const [balance, setBalance] = useState(0);
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const categoryId = params.get("id")

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            getCurrentChainId()
            let value = unit256ToNumber(await getBalanceOfConnectedWallet())
            setBalance(value)
            setNft(await getCategoryData(categoryId))
            setLoading(false)
            getCurrentChainId()


        }
        fetchData()
    }, [])

    function handleNftUnavaiable() {
        setDialog(
            <DialogComponent
                open={true}
                onClose={() => setDialog(null)}
            >
                <div>
                    <span className="detail-dialog-tx-header">Purchasing is currently unavaiable</span>
                    <span className="detail-dialog-tx-address"
                        onClick={() => window.location.reload()}
                    >Reload</span>
                </div>
            </DialogComponent>
        )
    }

    function handleErr(err: any) {
        setDialog(
            <DialogComponent
                open={true}
                onClose={() => setDialog(null)}
            >
                <div>
                    <span className="detail-dialog-tx-header">Transaction was not completed</span>
                    <span className="detail-dialog-tx-address">{err.message}</span>
                </div>
            </DialogComponent>
        )
    }

    function handleComplete(tx: string) {
        setDialog(<DialogComponent
            open={true}
            onClose={() => setDialog(null)}
        >
            <div>
                <span className="detail-dialog-tx-header">Transaction was submitted</span>
                <a href={CURRENT_NETWORK.scanUrl + "tx/" + tx} target="_blank" className="detail-dialog-tx-address">{formatShortWalletAddress(tx)}
                    <span>
                        <FaExternalLinkAlt />
                    </span>

                </a>
            </div>
        </DialogComponent>)
    }

    async function requestBuyNft() {
        var currentCategoryData = await getDetailCategory(categoryId)

        if (currentCategoryData.max == currentCategoryData.amount) {
            handleNftUnavaiable()
        } else {
            setTxLoading(true)
            var tx = await mintArtByCategoryId(categoryId, { gas: 400000, value: nft?.price.toString() || "0" }, (err: any, tx: string) => {
                setTxLoading(false)

                if (!err) {
                    handleComplete(tx)
                } else {
                    handleErr(err)
                }
            });
        }
    }

    if (isLoading) {
        return <div className="middle">
            <Loading />
        </div>
    }

    return (
        <div className="detail">
            {dialog}
            {
                isTxLoading ?
                    <div style={{ position: "absolute", top: "50%", left: "50%" }}>
                        <Loading />
                    </div>
                    : null
            }
            <span className="detail-title">{nft?.name}</span>

            <div className="detail-content">
                <div className="detail-left">
                    <span className="detail-label">Description</span>
                    <span className="detail-text ">{nft?.description}</span>
                    <span className="detail-label">Price</span>
                    <span className="detail-text detail-text-large">{`${formatCurrency(nft?.price)} BNB`}</span>
                    <span className="detail-label">Release date</span>
                    <span className="detail-text detail-text-large">{nft?.date}</span>
                    <span className="detail-label">Max supply</span>
                    <span className="detail-text detail-text-large">{nft?.max}</span>
                    <span className="detail-label">AR viewing instructinos</span>
                    <span className="detail-text ">{`This poster includes optional Augmented Reality features. Using a phone or tablet, you can experience this poster as it comes to life, including animation and sound.`}</span>
                </div>

                <div className="detail-center">
                    <div className="detail-model">
                        <ImageLoader
                            src={nft?.image}
                            className=""
                        />
                    </div>
                    <NavLink
                        to={"/view?id=" + categoryId}
                    >
                        <button className="detail-btn-view">VIEW EXPERIENCE</button>
                    </NavLink>
                </div>
                <div className="detail-right">
                    <div>
                        <span>
                            <span className="detail-highlight-label">Amount</span>
                            <span className="detail-your-balance">Your balance: {balance} BNB</span>
                        </span>
                        <span>
                            <span className="detail-amount">1</span>
                            <span className="detail-your-balance">Avaiable: {nft ? nft?.max - nft?.amount : 0} NFT</span>

                        </span>
                    </div>
                    <button type="button" className="detail-btn-buy btn-active"
                        onClick={() => requestBuyNft()}
                    >
                        Purchase the NFT
                    </button>
                </div>
            </div>


        </div>
    );
}

export default Detail