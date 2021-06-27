import React, { useEffect, useState } from 'react'
import "./collection.css"
import Loading from '../../component/loading/Loading';
import NftList from '../../component/list/NftList';
import { getCategoryData, getListNftOfOwner } from '../../utils/Util';
import { getSelectedAddress } from '../../data/api/Api';

const MyCollection: React.FC<{}> = () => {
    const [listNftOfOwner, setListNft] = useState([])
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const fetchMyCollections = async () => {
            let myAddress = getSelectedAddress()
            if (!myAddress) {
                window.location.href = "/"
            } else {
                let listNftOfOwner = await getListNftOfOwner(getSelectedAddress())
                setListNft(listNftOfOwner)
                setLoading(false)
            }
        }
        fetchMyCollections()
    }, [])
    if (isLoading) {
        return <div style={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Loading />
        </div>
    }
    return (
        <div className="home">
            <span className="home-title">My collections</span>
            <NftList list={listNftOfOwner} />
        </div>
    );
}


export default MyCollection
