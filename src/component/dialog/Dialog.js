import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent'
import "./dialog.css"

export default function DialogComponent(props) {

    return (
        <Dialog fullWidth={true} onClose={() => props.onClose()} open={props.open}>
            <div className="dialog">
                <div className="dialog-header">
                    <span className="dialog-title">{props?.title}</span>
                    <IconButton className="dialog-close" onClick={() => props.onClose()}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <div>
                    {
                        props.children
                    }
                </div>
            </div>

        </Dialog>
    )
}