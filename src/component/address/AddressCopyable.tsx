import React, { useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { FaCopy } from 'react-icons/fa';
import { formatShortWalletAddress } from '../../utils/Util';

const AddressCopyable: React.FC<{ address: string, className: string, length: number }> = ({ address, className, length }) => {
    const [copyTooltip, setCopyToolTip] = useState("Copy")

    return (
        <Tooltip title={copyTooltip}>
            <span style={{cursor: "pointer"}} className={className}
                onClick={() => {
                    navigator.clipboard.writeText(address)
                    setCopyToolTip("Copied")
                }}
                onMouseLeave={() => setCopyToolTip("Copy")
                }
            >{formatShortWalletAddress(address, length)}
                <span style={{marginLeft: "4px"}}><FaCopy /></span>
            </span>
        </Tooltip>
    )
}

export default AddressCopyable