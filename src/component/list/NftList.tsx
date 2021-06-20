import React, { useEffect, useState } from 'react';
import { Nft } from '../../utils/Type';
import { GoogleSpreadsheet } from 'google-spreadsheet'

import NftItem from '../item/NftItem';
import "./nft-list.css"
import { getListCategoryData, getNextReleaseItem } from '../../utils/Util';
import Loading from '../loading/Loading';

type props = {
    list: Array<Nft>
}

const NftList: React.FC<props> = ({ list }) => {

    return (
        <div className="nft-list">
            {
                list.length == 0 ?
                    <div className="nft-list-empty">
                        <span>No Item</span>
                    </div> :

                    list.map((item: any, index: number) => {
                        return <NftItem {...item} key={index} />
                    })
            }

        </div>
    );
}

export default NftList