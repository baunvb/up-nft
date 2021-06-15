import React, { useEffect, useRef } from 'react'
import ReactDOM from "react-dom";
import "./detail.css"
import * as THREE from "three";
import { NavLink } from 'react-router-dom'
import { Nft } from '../../utils/Type';


const Detail: React.FC<Nft> = (DetailProps) => {
    return (
        <div>
            <span>{DetailProps.title}</span>
            <span>Price: {DetailProps.price} UPS</span>
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                height: "auto",
                alignItems: "center",
                margin: "auto"
            }}>
                <div className="detail-model">
                    <img src="https://i.pinimg.com/originals/93/c2/ad/93c2adc4af76251f20d615ce146b1f33.jpg" />
                </div>

                <NavLink
                    to={"/view/address"}
                >
                    <button className="detail-btn-view">VIEW EXPERIENCE</button>
                </NavLink>

                <button className="detail-btn-buy btn-active">
                    BUY
               </button>
            </div>
        </div>
    );
}

export default Detail