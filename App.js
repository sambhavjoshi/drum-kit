import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Fragment, useState } from "react";
import WebFont from "webfontloader";
import Home from "./component/Home/Home";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser, updatePassword } from "./actions/userActions";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Cart/MyOrders.js";
import OrderDetails from "./component/Cart/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
import Inbox from "./component/Admin/Inbox.js";
import Message from "./component/Admin/Message.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState(
    "pk_test_51NPjIMSBny78VnBcXJPwZEoZUXZAfjdb9mY0e6MJkT7rQ1KW5xg1DcPtyXAsxCvx37L1Omsrius58XbMVT6UiuBq00inXFaxik"
  );

  const { mode } = useSelector((state) => state.mode);

  let theme = `${mode}-mode`;

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Merriweather", "Roboto", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, [mode]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // line 89 main set horhi products ke baad wale ko keyword bolna jo seacrh main use horha
  //console.log("App");
  return (
    <div className={theme}>
      <Router>
        <Header />

        <UserOptions user={user} isAuthenticated={isAuthenticated} />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/search" component={Search} />
          <Route path="/products/:keyword" component={Products} />
          <Route exact path="/login" component={LoginSignUp} />
          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />
          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute exact path="/orders" component={MyOrders} />
          <ProtectedRoute
            exact
            path="/confirm/order"
            component={ConfirmOrder}
          />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={ProductList}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/new/product"
            component={NewProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/product/:id"
            component={UpdateProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/orders"
            component={OrderList}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/order/:id"
            component={ProcessOrder}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/users"
            component={UsersList}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/user/:id"
            component={UpdateUser}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/reviews"
            component={ProductReviews}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/inbox"
            component={Inbox}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/message/:id"
            component={Message}
          />

          <Route
            component={
              window.location.pathname !== "/process/payment" ? NotFound : null
            }
          />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
