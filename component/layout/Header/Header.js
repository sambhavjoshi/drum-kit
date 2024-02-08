import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import logoDark from "../../../images/logoDark.png";
import { useSelector } from "react-redux";


const Header = () => {

  const { mode } = useSelector((state) => state.mode);
  const color = mode === "light" ? "rgb(53, 91, 217)" : "rgb(107, 223, 78)";
  const colorOnHover = mode === "light" ? "darkblue" : "rgb(140, 255, 125)";

  const options = {
    burgerColor: mode == "light" ? "rgb(53, 91, 217)" : "rgb(107, 223, 78)",
    burgerColorHover:
      mode == "light" ? "rgb(107, 223, 78)" : "rgb(53, 91, 217)",
    logo: mode === "light" ? logo : logoDark,
    logoWidth: "20vmax",
    navColor1: mode === "light" ? "azure" : "rgb(40, 41, 41)",
    logoHoverSize: "10px",
    logoHoverColor: mode === "light" ? "purple" : "rgb(71, 255, 249)",
    logoTransition: "0.7",
    logoAnimationTime: "0.9",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color:
      mode == "light" ? "rgba(35, 35, 35,0.8)" : "rgba(255, 255, 255, 0.814)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    nav2Transition: "0.7",
    nav3Transition: "0.7",
    nav4Transition: "0.7",
    link1ColorHover: colorOnHover,
    link1Margin: "1vmax",
    link1AnimationTime: "0.7",
    searchIconAnimationTime: "0.7",
    profileIconAnimationTime: "1.1",
    cartIconAnimationTime: "0.9",
    profileIconUrl: "/login",
    profileIconColor: color,
    searchIconColor: color,
    cartIconColor: color,
    profileIconColorHover: colorOnHover,
    searchIconColorHover: colorOnHover,
    cartIconColorHover: colorOnHover,
    cartIconMargin: "1vmax",
  };


  return <ReactNavbar {...options} />;
};

export default Header;
