import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import logo from "../../../images/logo.png";
import { Backdrop } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { useDispatch } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "../../../actions/userActions";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { DARK_MODE, LIGHT_MODE } from "../../../constants/modeConstants";
import profile from "../../../images/profile.png";

const UserOptions = ({ user, isAuthenticated }) => {

 

  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const { cartItems } = useSelector((state) => state.cart);
  const { mode } = useSelector((state) => state.mode);


  const color = mode === "light" ? "rgb(53, 91, 217)" : "rgb(107, 223, 78)";
  const [open, setOpen] = useState(false);
  const User = Array.isArray(user) ? user[0] : user;
  let url = null;
  try {
    url = User.avatar.url ? User.avatar.url : logo;
  } catch (error) {
    console.log(error.message);
    url = profile;
  }

  const light = {
    icon: <WbSunnyIcon />,
    name: "Light Mode",
    func: toggleLight,
  };
  const dark = {
    icon: <Brightness3Icon />,
    name: "Dark Mode",
    func: toggleDark,
  };
  const options = isAuthenticated
    ? [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
          icon: (
            <ShoppingCartIcon
              style={{
                color: cartItems.length > 0 ? color : "rgba(0,0,0,0.647)",
              }}
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },
        mode === "dark" ? light : dark,
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ]
    : [
        mode === "dark" ? light : dark,
        { icon: <PersonIcon />, name: "Login", func: loginUser },
      ];
  console.log(User);
  if (User && User.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function cart() {
    history.push("/cart");
  }

  function toggleDark() {
    dispatch({ type: DARK_MODE });
  }

  function toggleLight() {
    dispatch({ type: LIGHT_MODE });
  }

  function loginUser(){
    history.push("/login");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className="speedDial"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        direction="down"
        icon={<img className="speedDialIcon" src={url} alt="profile" />}
      >
        {options.map((item) => (
          <SpeedDialAction
            className="speedDialItems"
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
