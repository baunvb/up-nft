import React, { useEffect, useState } from 'react';
import { getListCategoryData, getNextReleaseItem } from '../../../../utils/Util';
import Loading from '../../../../component/loading/Loading';
import NftList from '../../../../component/list/NftList';

const MarketPlace: React.FC<{}> = () => {
    const [listItems, setListItems] = useState([])
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const fetchNextNftItems = async () => {
            const items = await getNextReleaseItem()
            var listNft = await getListCategoryData();
            setListItems([...listNft, ...items])
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
        <NftList list={listItems}/>
    );
}

export default MarketPlace