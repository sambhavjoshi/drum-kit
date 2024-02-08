import React from "react";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import logoDark from "../../images/logoDark.png";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import InboxIcon from "@material-ui/icons/Inbox";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { mode } = useSelector((state) => state.mode);

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={mode == "light" ? logo : logoDark} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/products">
        <p>
          <ListIcon />
          All Products
        </p>
      </Link>
      <Link to="/book/create">
        <p>
          <AddIcon />
          Create Book
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
      <Link to="/admin/inbox">
        <p>
          <InboxIcon />
          Inbox
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
