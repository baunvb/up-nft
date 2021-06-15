import "./layout.css"
import React, { useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import { Routers } from "../router/Routers";
import Sidebar from "../component/sidebar/Sidebar";
import Header from "../component/header/Header";
import { FaBars, FaTimes } from 'react-icons/fa';

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
        <span className="layout-sibar-icon-menu"
          onClick={() => setOpen(e => !e)}
        >
          {
            openSidebar ?
              <FaTimes size={30} /> :
              <FaBars size={30} />
          }
        </span>
        <Header />
        <div>
          {switchRoutes}
        </div>
      </div>
    </div>
  )
}