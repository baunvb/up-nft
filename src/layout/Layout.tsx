import "./layout.css"
import React, { useEffect, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import { Routers } from "../router/Routers";
import Sidebar from "../component/sidebar/Sidebar";
import Header from "../component/header/Header";
import { FaBars, FaTimes } from 'react-icons/fa';
import { isValidNetwork } from "../utils/Util";
import { getSelectedAddress } from "../data/api/Api";
import ErrorWallet from "../component/error/ErrorWallet";
import ErrorNetwork from "../component/error/ErrorNetwork";

const isMobile: boolean = window.innerWidth < 768

const switchRoutes = (
  <Switch>
    {Routers.map((e, key) => {
      return <Route exact path={e.path} component={e.component} key={key} />;
    })}
  </Switch>
);


export default function Layout(props: any) {
  const [openSidebar, setOpen] = useState(false)
  const [isValidNet, setIsValidNet] = useState(false)
  const [isDetectingNetwork, setIsDectect] = useState(true)

  useEffect(() => {
    const checkNetwork = async () => {
      //check is valid network first
      const isValid = await isValidNetwork()
      setIsValidNet(isValid)
      setIsDectect(false)
    }
    checkNetwork()
  }, [])

  return (
    <div className="layout">
      {/* <div className="layout-sidebar"
        style={{
          display: !isMobile ? "block" : openSidebar ? "block" : "none"
        }}
      >
        <Sidebar 
          onItemClick={() => {
            setOpen(false)
          }}
        />
      </div> */}
      <div className="layout-content">
        {/* <span className="layout-sibar-icon-menu"
          onClick={() => setOpen(e => !e)}
        >
          {
            openSidebar ?
              <FaTimes size={30} /> :
              <FaBars size={30} />
          }
        </span> */}
        <Header />
        <div>
          {
            !Boolean(getSelectedAddress()) ?
              <ErrorWallet /> : (!isValidNet && !isDetectingNetwork) ?
                <ErrorNetwork /> :
                switchRoutes
          }
        </div>
      </div>
    </div>
  )
}