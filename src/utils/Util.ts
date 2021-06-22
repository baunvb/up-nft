import BigNumber from "bignumber.js";
import Contracts from "../contracts/Contracts"
import { getSelectedAddress, initWeb3 } from "../data/api/Api";
import { BASE_PINATA_URL, NETWORK } from "./Constants";
import { Nft, MetaData, DetaiData } from "./Type";
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { chain } from "lodash";
declare const window: any;


BigNumber.config({
    EXPONENTIAL_AT: 1000,
    DECIMAL_PLACES: 80,
})

var web3: any = initWeb3()

export const formatCurrency = (value: number): string => {
    if (value <= 1) return value + ""
    return Boolean(value) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

}

export function unit256ToNumber(value: number, decimal = 18, fixNumber = 5): number {
    return Number(new BigNumber(value).div(new BigNumber(10).pow(decimal)).toFixed(fixNumber))
}

export const formatShortWalletAddress = (address: string): string => {
    return address.substr(0, 6) + '...' + address.substr(address.length - 4, address.length);

}

export const getDetailCategory = async (id: any) => {
    let value = await Contracts.UP_NFT.methods._idToCategory(id).call()
    console.log("_idToCategory: id = " + id, value)
    //raw value
    // {    
    //     amount: "1"
    //     id: "1"
    //     isSale: true
    //     max: "5"
    //     price: "100000000000000000"
    //     url: "QmR8pf56LZ3qTvTyTiAqJgVtp4V9UCRLTeHaHbWLrGEgcW"
    // }
    let data: DetaiData = {
        amount: parseInt(value.amount),
        id: parseInt(value.id), // this is categoryId
        isSale: value.isSale,
        max: parseInt(value.max),
        price: unit256ToNumber(parseFloat(value.price)),
        url: value.url
    }
    return data
}


export const _artIdToCategoryId = async (id: any) => {
    let value = await Contracts.UP_NFT.methods._artIdToCategoryId(id).call()
    return value
}

export const getListCategoryData = async () => {
    let amount: number = await getAmountCategory();
    let listNft: Array<Nft> = []
    for (let i: number = 1; i <= amount; i++) {
        let nft = await getCategoryData(i);
        if (nft != null) {
            listNft.push(nft)
        }
    }
    console.log("getListCategoryData", listNft)
    return listNft
}

export const getAmountCategory = async () => {
    var value = await Contracts.UP_NFT.methods.getAmountCategory().call()
    console.log("getAmountCategory:", value)
    return value
}

export const getAmountNFT = async () => {
    let value = await Contracts.UP_NFT.methods.getAmountNFT().call()
    return value
}

export const getTokenURI = async (id: any) => {
    let value = await Contracts.UP_NFT.methods.tokenURI(id).call()
    return value
}

export const fetchInfoFromURL = async (uilId: string) => {
    let uri = BASE_PINATA_URL + uilId;
    let info: MetaData;
    let res = await fetch(uri);
    let data = await res.text();
    let str = data.replace(/\,(?!\s*?[\{\[\"\'\w])/g, "")
    let json = JSON.parse(str)
    info = {
        name: json.name,
        description: json.description,
        image: json.image,
        vr_id: json.vr_id,
        date: json?.date
    }
    return info
}

//full nft data
export const getCategoryData = async (id: any) => {
    let detailCategory: DetaiData = await getDetailCategory(id);
    console.log("detailCategory", detailCategory)
    if (!Boolean(detailCategory.url) || !detailCategory.isSale) {
        return null
    } else {
        let infoFromUrl: MetaData = await fetchInfoFromURL(detailCategory.url);
        let nftData: Nft = {
            ...detailCategory,
            ...infoFromUrl,
            owner: ""
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

export const ownerOfNft = async (tokenId: any) => {
    return await Contracts.UP_NFT.methods.ownerOf(tokenId).call()
}

export const getCategoryIdFromNftId = async (tokenId: any) => {
    return await Contracts.UP_NFT.methods._artIdToCategoryId(tokenId).call()
}

//fetch googlesheet next-release item
export const getNextReleaseItem = async () => {
    const doc = new GoogleSpreadsheet('1-UWE8fMqgxFEBYeUF1gBjRWYolIlVcobCaB7OTSaTHI');
    doc.useServiceAccountAuth({
        "client_email": "nft-935@cogent-theater-317217.iam.gserviceaccount.com",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCasquAKhhTN+Je\n96T2rTjJAv0iDxNwaU3s4P4OZGwiE5s1cHeT/gvYOZLVF/mqs80169N1IJTZjyU3\nUoIIJ9JL6YhTxJQCEPBb8eZsqVT/Kz7VC4UI8mgKaGMj42a+aReFwVnNmdTGXt77\nS/i+mPb0WiQ4mW0zu55U206kVFYDUq1eJyai/NdwML4kz9DQTIWSgUAEfhJ4j5pu\nNNMyVU2ne5Wu2sJ6p9/xcsM9KUWO2Ezhp2RNVIrsPdi2g1QgcgGKDv1n/uqh+fha\nHlw+GPRlI/GJabwPUZDrOQNfxRPNU5s5mMTnZn3aiaLnowsOiFC6pauBnYLKYwVj\nRTfRvvcJAgMBAAECggEAAYAcPQbx5SeJW0tZG87KmnTpA7ianNBBdUiQX9wPyjvS\njIMXZQWfIH0cd4ZYp+2mOHC3XhWcQ/wisjjrZUAnoFz22ZZYqvV2Zo0ZcEveWzqh\nTLuXuHvx0BbUZ7x0pzU81gTUUpo8aVXxutIkXgrjRRoohRQ3evufbN2TE3Gnw1DF\n2cRwQteTs8LMkkDKu7rhkEA0LAL6pcfQIqoegdlU7UD0n+sp2jwqp6ASBz4L0rt2\ni2Ox+HEBNQ0GTDaXG3l/ZB2pPLnq2VsuS/GxAiAShJM7eG+eEIHuaJUQN5t8gzMd\nk8yaLY15AaOeJA1ekuxnXIApS07tBgH7WPDBqV+bRQKBgQDXDrRpee7FEKomQHXX\naUBfenrg9Zrbcm3yqJv1nV/3+DDrFuaWUZuyuUBVuCTkg3MPpu8u1zFTxaS5ta6z\nfedaZPbXPow1EbiXYwGXadUqhbJxXzPa/WnxKXLMVxDJr6uvo7hqqWuHSKrH1EUO\n75tK6fjKQX1LOlCDik61cdf/BQKBgQC4JjZWRM7x6torIcN6DFM25TFGGjQ98nk+\ni66BAWEykmcB9SwQXz+R7WDcq4JJ5VJ7IQyZNGu6lPSafMcgo5Y0hToUFYfnNian\n8AyT7huy5c55boosAmGGs4IxXgCpIJCCpXNM6Ndl12S2rie0mPbbCuwSS8bq2RD5\niDZnGORvNQKBgGKf3L7ua0C2psFKGIDERQBEZCvclrsC3EdHadaW6JcInC6D3xWa\nsWOiL03gWBLv8YmBDfmWOInpfuSn3El2eO3slYMarSP9T4Elp2ov39FTZQU3GsnY\nI4i0cHAjkZBc3sh6ta08qxJskd14jH8QBVCywiTHKdWhFaFtgTEW126dAoGAWBd3\nkOdTtCir+0wojd8Ng8o6OxXX/fZbh88cSHxXefDNNAOL870M1Qsgdg/ZwO3h+iMC\nOtv32QbeyHR+cZ+wACnncaonHDUsYtQTwER8naUPk8mMcacl7mE7G9CjMkTwvH7X\nXGhaek6C0F0Zg2xVUs2zxsDXRItYcnZ1x/YBeS0CgYBv3TTtZdiGS2ddAqCasl56\nEW3C3seIXKfyu3AZPRVX07J2mrVbMbqy+uJJd2SN6iHRJZeldRQtOHnexZiWVKjj\nHx8PkCTnv5UrQXHpN+3b9tbpLlsHBDaUiBYujG2Sf1MTAI2GwXqsvtUWhSsSrmHR\nn4Z/bHTuHbVAyz10/mh0IA==\n-----END PRIVATE KEY-----\n",
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["next-item"];
    const rows = await sheet.getRows();
    const items = rows.map((row, index) => {
        return {
            name: row.name,
            date: row.date,
            isSale: false
        }
    })

    return items;
}

//get my balanceof owener
export const getBalanceOf = async (owner: any) => {
    let value = await Contracts.UP_NFT.methods.balanceOf(owner).call()
    console.log("balanceOf owner: " + owner, value)
    return value
}

//get tokenId of owner with index
export const getTokenIdOf = async (owner: any, index: any) => {
    let value = await Contracts.UP_NFT.methods.tokeIdOf(owner, index).call()
    console.log("tokeIdOf owner = " + owner + " index = " + index, value)
    return value
}

export const getListNftOfOwner = async (owner: any) => {
    let count = await getBalanceOf(owner)
    let listNft: Array<Nft> = []
    for (let i = 1; i <= count; i++) {
        let tokenId = await getTokenIdOf(owner, i);
        let categoryId = await getCategoryIdFromNftId(tokenId);
        let categoryData = await getCategoryData(categoryId);
        if (categoryData != null) {
            let nft: Nft = {
                ...categoryData,
                id: tokenId, //this is id of tokenId, different from category id
                owner: owner,
                type: "collection"
            }
            listNft.push(nft)
        }
    }
    return listNft
}

//get balance of wallet
export const getBalanceOfConnectedWallet = async () => {
    return await web3.eth.getBalance(getSelectedAddress())
}

//get current network chainId

export const getCurrentChainId = async () => {
    let chainId = await web3.eth.net.getId()
    return chainId
}

export const isValidNetwork = async () => {
    let currentChainId = await getCurrentChainId()
    return currentChainId == NETWORK.BSC_TESTNET.chainId
}

export const isEthereumSupport = () => {
    return Boolean(window.ethereum)
}