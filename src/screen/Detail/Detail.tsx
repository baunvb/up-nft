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
import { formatCurrency, getDetailCategory, _artIdToCategoryId, unit256ToNumber, getCategoryData, mintArtByCategoryId, formatShortWalletAddress, getAmountCategory, getAmountNFT, ownerOfNft, getBalanceOfConnectedWallet, getCurrentChainId, isValidNetwork, getCategoryIdFromNftId } from '../../utils/Util';
import { nthArg } from 'lodash';
import Loading from '../../component/loading/Loading';
import { FaExternalLinkAlt, FaCheckCircle, FaExclamationCircle, FaCopy } from 'react-icons/fa';
import DialogComponent from '../../component/dialog/Dialog';
import { NETWORK, CONTRACTS_ADDRESS } from '../../utils/Constants';
import ImageLoader from '../../component/imageloader/ImageLoader';
import Tooltip from '@material-ui/core/Tooltip';

declare const window: any;

const CURRENT_NETWORK = process.env.REACT_APP_ETHEREUM_NETWORK == "BSC_MAINNET" ? NETWORK["BSC_MAINNET"] : NETWORK["BSC_TESTNET"]

const TransactionResultComponent = (props: any) => {
    const [copyTooltip, setCopyToolTip] = useState("Copy")
    const { receipt } = props;
    return (
        <DialogComponent
            open={true}
            onClose={() => props.onClose()}
            title={receipt.status ? "Your purchase was completed" : "Your purchase was not complete"}
        >
            <div>
                <span className="detail-nft-info-label">Transaction hash: </span>

                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <a href={CURRENT_NETWORK.scanUrl + "tx/" + receipt.transactionHash} target="_blank" className="detail-nft-info-value">
                        {formatShortWalletAddress(receipt.transactionHash)}
                        <FaExternalLinkAlt style={{ marginLeft: "2px" }} />
                    </a>
                    {
                        receipt.status ?
                            <span className="detail-dialog-status">
                                <FaCheckCircle color="green" />
                                <span>Success</span>
                            </span> :
                            <span className="detail-dialog-status">
                                <FaExclamationCircle color="red" />
                                <span>Error</span>
                            </span>
                    }
                </div>

                {
                    receipt.status && <div style={{ textAlign: "left" }}>
                        <span className="detail-nft-info-label">NFT Address</span>
                        <Tooltip title={copyTooltip}>
                            <span className="detail-nft-info-value"
                                onClick={() => {
                                    navigator.clipboard.writeText(CONTRACTS_ADDRESS.UP_NFT)
                                    setCopyToolTip("Copied")
                                }}
                                onMouseLeave={() => setCopyToolTip("Copy")
                                }
                            >{CONTRACTS_ADDRESS.UP_NFT} <FaCopy /></span>
                        </Tooltip>
                        <span className="detail-nft-info-label">NFT ID</span>
                        <span className="detail-nft-info-value">{receipt.events.Transfer.returnValues.tokenId}</span>

                    </div>
                }
            </div>
        </DialogComponent>
    )
}

const Detail: React.FC<Nft> = () => {
    const [nft, setNft] = useState<Nft>(null)
    const [isLoading, setLoading] = useState(false)
    const [isTxLoading, setTxLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [mintingResult, setMintingResult] = useState({ isSuccess: Boolean, message: String })
    const [balance, setBalance] = useState(0);
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const id = params.get("id")
    const isMyCollection = params.get("type") == "mycolection"

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let value = unit256ToNumber(await getBalanceOfConnectedWallet())
            setBalance(value)
            let detailData;
            if (isMyCollection) {
                // this id is tokenId
                let categoryId = await getCategoryIdFromNftId(id)
                detailData = await getCategoryData(categoryId);

            } else {
                // this id is categoryId
                detailData = await getCategoryData(id);
            }
            setNft(detailData)
            setLoading(false)
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

    function onError(err: any) {
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

    function onTransactionHash(tx: string) {
        setDialog(<DialogComponent
            open={true}
            onClose={() => setDialog(null)}
        >
            <div className="center">
                <Loading />
                <span className="detail-dialog-tx-header">Transaction was submitted</span>
                <a href={CURRENT_NETWORK.scanUrl + "tx/" + tx} target="_blank" className="detail-dialog-tx-address">{formatShortWalletAddress(tx)}
                    <span>
                        <FaExternalLinkAlt />
                    </span>
                </a>
            </div>
        </DialogComponent>)
    }

    function onConfirmation(confirmationNumber: number, receipt: any) {
        setDialog(
            <TransactionResultComponent
                receipt={receipt}
                onClose={() => setDialog(null)}
            />
        )
    }

    async function requestBuyNft() {
        var currentCategoryData = await getDetailCategory(id)

        if (currentCategoryData.max == currentCategoryData.amount) {
            handleNftUnavaiable()
        } else {
            setTxLoading(true)
            let tras = await mintArtByCategoryId(id, { gas: 400000, value: nft?.price.toString() || "0" },
                (transactionHash: string) => {
                    onTransactionHash(transactionHash)
                },
                (confirmationNumber: number, receipt: any) => {
                    console.log(confirmationNumber)
                    onConfirmation(confirmationNumber, receipt)
                },
                (error: any) => {
                    console.log(error)
                    onError(error)
                }
            )
        }
    }

    function requestSellNft() {
        setDialog(<DialogComponent
            open={true}
            onClose={() => setDialog(null)}
        >
            <div>
                <span className="detail-dialog-tx-header">This feature is currently does not support</span>
            </div>
        </DialogComponent>)
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
                    <div style={{ position: "absolute", top: "50%", left: "50%", zIndex: 1 }}>
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
                        to={!isMyCollection ? "/view?id=" + id : "/view?id=" + id + "&type=mycolection"}
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

                    {
                        !isMyCollection ?
                            <button type="button" className="detail-btn-buy btn-active"
                                onClick={() => requestBuyNft()}
                            >
                                Buy the NFT
                    </button> :
                            <>
                                <button type="button" className="detail-btn-buy btn-active"
                                    onClick={() => requestSellNft()}
                                >
                                    Sell the NFT
                    </button>
                            </>
                    }




                </div>
            </div>


        </div>
    );
}

export default Detail