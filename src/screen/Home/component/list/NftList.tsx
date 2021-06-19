import React, { useEffect, useState } from 'react';
import { Nft } from '../../../../utils/Type';
import { GoogleSpreadsheet } from 'google-spreadsheet'

import NftItem from '../item/NftItem';
import "./nft-list.css"
import { getListCategoryData } from '../../../../utils/Util';
import Loading from '../../../../component/loading/Loading';

const IMG_URL = [
    "https://i.pinimg.com/originals/93/c2/ad/93c2adc4af76251f20d615ce146b1f33.jpg",
    "https://live.staticflickr.com/2718/4417471942_2e820eb81a_o.jpg",
    "https://1.bp.blogspot.com/-cfy_NYQ_COc/VLh31pS-kxI/AAAAAAAAMbM/GDgjkwvAOpo/s1600/tranh%2Bdong%2Bho%2B-%2Bdong%2Bho%2Bpainting%2BDam%2Bcuoi%2Bchuot.jpg"
]

const NftList: React.FC<{}> = () => {

    const [listItems, setListItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const fetchNextNftItems = async () => {

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
            var listNft = await getListCategoryData();
            setListItems([...listNft, ...items].filter((i, index) => index < 12))
            setLoading(false)
        }
        fetchNextNftItems()
    }, [])
    if (isLoading) {
        return <div style={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Loading />
        </div>
    }
    return (
        <div className="nft-list">
            {
                
                listItems.map((item, index) => {
                    return <NftItem {...item} key={index} />
                })
                
            }
        </div>
    );
}

export default NftList