import React, { useState } from "react";

import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { Page, Content } from "./mainLayout.styles";
import Header from "../components/header/header.component";
import { useNavigate, useLocation } from "react-router-dom";

export const Context = React.createContext({});

const MainLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn, user } = useAuth();


  React.useEffect(() => {
    console.log(user);
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (user?.isAdmin) {
        navigate("/admin");
      } else if (pathname === "/") {
        navigate("/home");
      } else {
        navigate(pathname);
      }
    }
  }, [isLoggedIn]);


  return (
    <Page>
      <Header />

      <Content>
        <Outlet />
      </Content>
    </Page>
  );
};

export default MainLayout;
