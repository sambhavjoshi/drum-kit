import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import MetaData from "../layout/MetaData";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Line, Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userActions.js";
import { getAllContacts } from "../../actions/contactAction.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const {orders} = useSelector(state => state.allOrders);
  const {users} = useSelector(state => state.allUsers); 
  const {contacts} = useSelector(state => state.contacts);
  const {mode} = useSelector(state => state.mode);

  let outOfStock = 0;
  let totalAmount = 0;
  let len = products ? products.length : 10000;

 //console.log("products",products);
 
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

      useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
        dispatch(getAllContacts());
      }, [dispatch]); 
    
      orders &&
        orders.forEach((item) => {
          totalAmount += item.totalPrice;
        });

  const options = {
    borderColor: mode === "light" ? "rgb(0,0,0,0.75)" : "rgb(255,255,255,0.75)",
    scales: {
      yAxes: {
        grid: {
          color: mode === "light" ? "rgb(0,0,0,0.75)" : "rgb(255,255,255,0.75)",
        },
        ticks: {
          color: mode === "light" ? "rgb(0,0,0,0.75)" : "rgb(255,255,255,0.75)",
        },
      },
      xAxes: {
        grid: {
          color: mode === "light" ? "rgb(0,0,0,0.75)" : "rgb(255,255,255,0.75)",
        },
        ticks: {
          color: mode === "light" ? "rgb(0,0,0,0.75)" : "rgb(255,255,255,0.75)",
        },
      },
    },
  };

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: [
          mode === "light" ? "rgb(71, 103, 207)" : "rgb(107, 223, 78)",
        ],
        hoverBackgroundColor: [
          mode === "light" ? "darkblue" : "rgb(140, 255, 125)",
        ],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["out of stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["red", "green"],
        hoverBackgroundColor: ["darkred", "lightgreen"],
        data: [outOfStock, len - outOfStock]
      },
    ],
  };




  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ${totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders" id="abc">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
            <Link to="/admin/inbox">
              <p>Messages</p>
              <p>{contacts && contacts.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} options={options}/>
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
