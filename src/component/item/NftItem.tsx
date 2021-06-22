import React from 'react';
import "./nft-item.css"
import { NavLink } from 'react-router-dom'
import { formatShortWalletAddress } from '../../utils/Util';
import { Nft } from '../../utils/Type';
import DefaultImg from "../../assets/images/item_preview_lock.png"
import ImageLoader from '../imageloader/ImageLoader';

const NftItem: React.FC<Nft> = (ItemProps) => {

  return (
    <div className="nft-item" >
      <div className="nft-item-boder">
        <div className="nft-item-img">

          {
            ItemProps.isSale ?
              // <img alt="" src={ItemProps.image} className="nft-item-img-img "/> :
              <ImageLoader src={ItemProps.image} className="nft-item-img-img" /> :
              <img alt="" className="nft-item-img-img" src={DefaultImg} />
          }
        </div>
        <span className="nft-item-name">{ItemProps.name}</span>
        <div className="nft-item-info">
          <span>
            <span>Owner</span>
            <span>{ItemProps.isSale ? formatShortWalletAddress(ItemProps.owner || "") : "N/A"}</span>
          </span>
          <span>
            <span>Price</span>
            <span>{ItemProps.isSale ? `${ItemProps.price} BNB` : "N/A"}</span>
          </span>
          <span>
            <span>Release date</span>
            <span>{ItemProps.date}</span>
          </span>
        </div>
      </div>
      {
        ItemProps.type == "collection" ?
          <NavLink
            to={`/detail?id=${ItemProps.id}&type=mycolection`}
            className={"nft-item-btn btn-active"}
          >Detail</NavLink> :
          ItemProps.isSale ?
            <NavLink
              to={`/detail?id=${ItemProps.id}`}
              className={"nft-item-btn btn-active"}
            >Join NOW</NavLink> :
            <div
              className={"nft-item-btn nft-item-btn-disable"}
            >Join NOW</div>
      }


    </div>
  );
}


export default NftItem