import React, { useEffect, useState } from 'react';
import { Nft } from '../../../../utils/Type';
import NftItem from '../item/NftItem';
import "./nft-list.css"

const IMG_URL = [
    "https://i.pinimg.com/originals/93/c2/ad/93c2adc4af76251f20d615ce146b1f33.jpg",
    "https://live.staticflickr.com/2718/4417471942_2e820eb81a_o.jpg",
    "https://1.bp.blogspot.com/-cfy_NYQ_COc/VLh31pS-kxI/AAAAAAAAMbM/GDgjkwvAOpo/s1600/tranh%2Bdong%2Bho%2B-%2Bdong%2Bho%2Bpainting%2BDam%2Bcuoi%2Bchuot.jpg"
]


const NftList: React.FC<{}> = () => {

    var list: Array<Nft> = []
    for (let i = 0; i < 12; i++) {
        list.push({
            address: "0xbCbeF5b730fb7c79393e7f7D9D05DBA0651749c" + i,
            price: 5 + i * 10,
            image: IMG_URL[i%3]
        })
    }

    return (
        <div className="nft-list">
            {
                list.map((item, index) => {
                    return <NftItem {...item} key={index} />
                })
            }
        </div>
    );
}

export default NftList