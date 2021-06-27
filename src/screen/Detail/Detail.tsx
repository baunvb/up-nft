import React, { useEffect, useRef, useState } from 'react'
import "./detail.css"
import MyNftDetail from './component/MyNftDetail';
import MarketplaceDetail from './component/MarketplaceDetail';
import { idText } from 'typescript';

const Detail: React.FC<{}> = () => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const id = params.get("id")
    const isMyCollection = params.get("type") == "mycolection"

    if (isMyCollection){
        return <MyNftDetail id={parseInt(id)} />
    } else {
        return <MarketplaceDetail id={parseInt(id)} />
    }


}

export default Detail