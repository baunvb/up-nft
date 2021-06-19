import React from 'react'
import Home from "../screen/Home/Home"
import { CurrencyExchange, HouseFill, CurrencyDollar, FileTextFill, Coin } from 'react-bootstrap-icons';
import { FaCubes, FaExchangeAlt, FaExternalLinkAlt, FaHandHoldingUsd } from 'react-icons/fa';
import Detail from '../screen/Detail/Detail';
import ViewVr from '../screen/ViewVR/ViewVr';

const SIZE = 20;

export interface route {
    path: string,
    name: string,
    component: any,
    icon: JSX.Element,
    redirect?: boolean,
    to?: string,
    subIcon?: JSX.Element,
}

export const Routers: Array<route> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        icon: <HouseFill size={SIZE} />
    },
    {
        path: "/detail",
        name: "Detail",
        component: Detail,
        icon: <HouseFill size={SIZE} />
    },
    {
        path: "/view",
        name: "View VR",
        component: ViewVr,
        icon: <HouseFill size={SIZE} />
    }
]