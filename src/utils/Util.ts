import BigNumber from "bignumber.js";
import Contracts from "../contracts/Contracts"
import { getSelectedAddress, initWeb3 } from "../data/api/Api";
import { BASE_PINATA_URL } from "./Constants";
import { Nft, MetaData, DetaiData } from "./Type";
BigNumber.config({
    EXPONENTIAL_AT: 1000,
    DECIMAL_PLACES: 80,
})

var web3: any = initWeb3()

export const formatCurrency = (value: number): string => {
    if (value <= 1) return value + ""
    return Boolean(value) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

}

export function unit256ToNumber(value: number, decimal = 18, fixNumber = 3): number {
    return Number(new BigNumber(value).div(new BigNumber(10).pow(decimal)).toFixed(fixNumber))
}

export const formatShortWalletAddress = (address: string): string => {
    return address.substr(0, 6) + '...' + address.substr(address.length - 4, address.length);

}

export const getDetailCategory = async (id: any) => {
    var value = await Contracts.UP_NFT.methods._idToCategory(id).call()
    //raw value
    // {    
    //     amount: "1"
    //     id: "1"
    //     isSale: true
    //     max: "5"
    //     price: "100000000000000000"
    //     url: "QmR8pf56LZ3qTvTyTiAqJgVtp4V9UCRLTeHaHbWLrGEgcW"
    // }
    var data: DetaiData = {
        amount: parseInt(value.amount),
        id: parseInt(value.id),
        isSale: value.isSale,
        max: parseInt(value.max),
        price: unit256ToNumber(parseFloat(value.price)),
        url: value.url
    }
    return data
}


export const _artIdToCategoryId = async (id: any) => {
    var value = await Contracts.UP_NFT.methods._artIdToCategoryId(id).call()
    return value
}

export const getAmountCategory = async () => {
    var value = await Contracts.UP_NFT.methods.getAmountCategory().call()
    return value
}

export const getListCategoryData = async () => {
    var amount: number = await getAmountCategory();
    var listNft: Array<Nft> = []
    for (let i: number = 1; i <= amount; i++) {
        var nft = await getNftData(i);
        listNft.push(nft)
    }
    console.log("getListCategoryData", listNft)
    return listNft.filter(v => v !== null)
}

export const getAmountNFT = async () => {
    var value = await Contracts.UP_NFT.methods.getAmountNFT().call()
    return value
}
export const getTokenURI = async (id: any) => {
    var value = await Contracts.UP_NFT.methods.tokenURI(id).call()
    return value
}

export const fetchInfoFromURL = async (uilId: string) => {
    var uri = BASE_PINATA_URL + uilId;
    var info: MetaData;
    let res = await fetch(uri);
    let data = await res.text();
    var str = data.replace(/\,(?!\s*?[\{\[\"\'\w])/g, "")
    var json = JSON.parse(str)
    info = {
        name: json.name,
        description: json.description,
        image: json.image,
        vr_id: json.vr_id
    }
    return info
}

//full nft data
export const getNftData = async (id: any) => {
    var detailCategory: DetaiData = await getDetailCategory(id);
    console.log("detailCategory", detailCategory)
    if (!Boolean(detailCategory.url) || !detailCategory.isSale) {
        return null
    } else {
        var infoFromUrl: MetaData = await fetchInfoFromURL(detailCategory.url);
        var owner: string = await ownerOfNft(id)

        var nftData: Nft = {
            ...detailCategory,
            ...infoFromUrl
        }
        return nftData;
    }

}

export const mintArtByCategoryId = async (id: any, options: any, callback: any) => {
    await Contracts.UP_NFT.methods.mintArtByCategoryId(id).
        send({ from: getSelectedAddress(), gas: options.gas, value: web3.utils.toWei(options.value, "ether") }, function (err: any, tx: string) {
            callback(err, tx)
        })

}

export const ownerOfNft = async (id: any) => {
    return await Contracts.UP_NFT.methods.ownerOf(id).call()
}
