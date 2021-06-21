import React from "react"

import { NETWORK } from "../../utils/Constants"

const CURRENT_NETWORK = process.env.REACT_APP_ETHEREUM_NETWORK == "BSC_MAINNET" ? NETWORK["BSC_MAINNET"] : NETWORK["BSC_TESTNET"]

const ErrorNetwork: React.FC<{}> = () => {
    return <div className="middle">
        <span className="detail-warning">Please change your wallet's network to {CURRENT_NETWORK.name}</span>
    </div>

}

export default ErrorNetwork