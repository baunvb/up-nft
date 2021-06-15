import React from 'react';
import "./nft-item.css"
import { NavLink } from 'react-router-dom'
import { formatShortWalletAddress } from '../../../../utils/Util';
import { Nft } from '../../../../utils/Type';

const NftItem: React.FC<Nft> = (ItemProps) => {
  return (
    <NavLink className="nft-item" to={'/detail/' + ItemProps.address}>
      <div className="nft-item-img">
          <img alt="" src={ItemProps.image}/>
      </div>
      <div className="nft-item-info">
        <span>
            <span>Address</span>
            <span>{formatShortWalletAddress(ItemProps.address)}</span>
        </span>
        <span>
            <span>Price</span> 
            <span>{ItemProps.price} UPS</span>
        </span>
        {/* <span>
            <span>Participants</span>
            <span>Public</span>
        </span> */}
      </div>
      <button
        className="nft-item-btn btn-active"
      >Join NOW</button>
    </NavLink>
  );
}


export default NftItem