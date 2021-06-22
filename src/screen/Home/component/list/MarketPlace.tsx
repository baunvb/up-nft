import React, { useEffect, useState } from 'react';
import { getListCategoryData, getNextReleaseItem } from '../../../../utils/Util';
import Loading from '../../../../component/loading/Loading';
import NftList from '../../../../component/list/NftList';

const MarketPlace: React.FC<{}> = () => {
    const [listItems, setListItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const fetchNextNftItems = async () => {
            var listNft = await getListCategoryData();
            setListItems(listNft)
            setLoading(false)
            const items = await getNextReleaseItem()
            setListItems((previous) => [...previous, ...items])

        }
        fetchNextNftItems()
    }, [])
    if (isLoading) {
        return <div style={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Loading />
        </div>
    }
    return (
        <NftList list={listItems}/>
    );
}

export default MarketPlace