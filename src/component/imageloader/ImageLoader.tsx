import React, { useRef, useState, useEffect } from 'react'
import Loading from '../loading/Loading'
import "./imageloader.css"

const ImagePlaceholder: React.FC<{}> = () => {
    return <div className="load-wraper">
        <div className="activity"></div>
    </div>
}

const ImageLoader: React.FC<{ src: string, className: string }> = ({ src, className }) => {
    const [loaded, setLoaded] = useState(false)
    const imgRef = useRef(null)

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            onLoad()
        }
    })

    const onLoad = () => {
        setTimeout(function () {
            setLoaded(true)
        }, 2000)
    }

    return (
        <>
            <img ref={imgRef} alt="" src={src}
                id="imgloader"
                className={className}
                onLoad={() => onLoad()}
            />

            <div style={{ display: !loaded ? "block" : "none", width: '100%', height: '100%', position: "absolute" }}>
                <ImagePlaceholder />
            </div>

        </>
    )
}

export default ImageLoader