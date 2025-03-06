import React from 'react'
import LeftSidebar from "../common/LeftSidebar";
import Bottombar from "../common/Bottombar";
import { Outlet } from "react-router-dom";
import Topbar from '../common/Topbar';

const Layout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar/>
    <LeftSidebar />
    <section className="flex flex-1 h-full">
      <Outlet />
      <Bottombar />
     </section>
  </div>
  )
}

export default Layout