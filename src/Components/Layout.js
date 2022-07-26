import React from "react";
import { Outlet } from "react-router-dom";

//Component for returning speicific components under animated routes
const Layout = () => {
  return <Outlet />;
};

export default Layout;
