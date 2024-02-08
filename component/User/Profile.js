import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useDispatch } from "react-redux";
import { loadUser } from "../../actions/userActions";
import logo from "../../images/logo.png";
import { clearErrors, myOrders } from "../../actions/orderAction";

const Profile = ({ history }) => {
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const {
    loading: orderLoading,
    error,
    orders,
  } = useSelector((state) => state.myOrders);
  const User = Array.isArray(user) ? user[0] : user;
  let imgSrc = logo;
  let cost = 0;

  try {
    imgSrc = User.avatar.url ? User.avatar.url : logo;
    orders.forEach((order) => {
      cost += order.totalPrice;
    });
  } catch (error) {
    console.log(error.message);
  }

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [history, isAuthenticated, error]);
  return (
    <Fragment>
      {loading || orderLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${User.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={imgSrc} alt={User.name} />
              <Link to="/me/update" className="editProfileBtn">
                Edit Profile
              </Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{User.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{User.email}</p>
              </div>
              <div>
                <h4>Total Orders</h4>
                <p>{orders.length}</p>
              </div>
              <div>
                <h4>Total Spent</h4>
                <p>{`$${cost}`}</p>
              </div>
              <div>
                <Link to="/orders" className="neonButtons">
                  My Orders
                </Link>
                <Link to="/password/update" className="neonButtons">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
