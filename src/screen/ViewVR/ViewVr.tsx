import React, { useEffect, useRef, useState } from 'react'
import "./view.css"
import QRCode from "react-qr-code";
import { Nft } from '../../utils/Type';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { getCategoryData, getCategoryIdFromNftId } from '../../utils/Util';

const ViewVr: React.FC<{}> = () => {
    const history = useHistory()
    const [nft, setNft] = useState<Nft>(null)

    const { search } = window.location;
    const params = new URLSearchParams(search);
    const id = params.get("id")
    const isMyCollection = params.get("type") == "mycolection"

    const toggleFullScreen = () => {
        document.getElementById("image").requestFullscreen();
    }

    useEffect(() => {
        const fetchData = async () => {
            let detailData;

            if (isMyCollection) {
                // this id is tokenId
                let categoryId = await getCategoryIdFromNftId(id)
                detailData = await getCategoryData(categoryId);

            } else {
                // this id is categoryId
                detailData = await getCategoryData(id);
            }
            setNft(detailData)
        }
        fetchData()
    }, [])

    return (
        <div className="view">
            <span className="view-header">AR INSTRUCTIONS</span>
            <span className="view-text">This poster includes optional Augmented Reality features.
            Using a phone or tablet, you can experience this poster as it comes to life,
                including animation and sound.</span>
            <div className="view-qr-wrapper">
                <div>
                    <div className="view-qr">
                        <QRCode size={200} value={"https://ww.instagram.com/ar/" + nft?.vr_id} />
                    </div>
                    <span className="view-qr-social">
                        <FaInstagram size={20} />
                        <span style={{ marginLeft: "8px" }}>Instagram</span>
                    </span>
                </div>
                <div>
                    <div className="view-qr">
                        <QRCode size={200} value={"https://www.facebook.com/fbcameraeffects/tryit/" + nft?.vr_id} />
                    </div>
                    <span className="view-qr-social">
                        <FaFacebook size={20} />
                        <span style={{ marginLeft: "8px" }}>Facebook</span>
                    </span>
                </div>
            </div>

            <ul className="view-step view-text">
                <li>Use the camera on your phone or tablet to scan the QR Code.</li>
                <li>Choose either Facebook or Instagram to continue with the experience.
                    You will need the latest version on your device.</li>
                <li>Press the Continue button below,
                    and then use the camera on your device to look at the poster on the screen.</li>

            </ul>
            <div className="view-btn">
                <button className="view-btn-cancel"
                    onClick={() => history.goBack()}
                >Cancel</button>
                <button className="btn-active"
                    onClick={() => toggleFullScreen()}
                >Continue</button>
            </div>
            <div>
                <img id="image" alt="" src={nft?.image} />
            </div>
        </div>
    )
}

export default ViewVr