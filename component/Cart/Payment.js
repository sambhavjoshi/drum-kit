import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { clearErrors,createOrder } from "../../actions/orderAction";
import { EMPTY_CART } from "../../constants/cartConstants";


const Payment = ({history}) =>{

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

     const dispatch = useDispatch();
     const alert = useAlert();
     const stripe = useStripe();
     const elements = useElements();
     const payBtn = useRef(null); 

     const {mode} = useSelector(state => state.mode);

     const options = {
       style: {
         base: {
           color:
             mode === "light"
               ? "rgba(0, 0, 0, 0.816)"
               : "rgba(255, 255, 255, 0.814)",
         },
       },
     };
     const {shippingInfo,cartItems} = useSelector((state)=>state.cart);
     const {user} = useSelector(state => state.user);
     const {error} = useSelector(state => state.newOrder);

     console.log(cartItems);

     const paymentData = {
       amount: Math.round(orderInfo.totalPrice * 100),//paise main lerhe
     };

     const order = {
       shippingInfo,
       orderItems: cartItems,
       itemsPrice: orderInfo.subtotal,
       taxPrice: orderInfo.tax,
       shippingPrice: orderInfo.shippingCharges,
       totalPrice: orderInfo.totalPrice,
       discountedPrice: orderInfo.discounted
     };

     const submitHandler = async (e) => {
       e.preventDefault();

       payBtn.current.disabled = true;

       try {
         const config = {
           headers: {
             "Content-Type": "application/json",
           },
         };
         const { data } = await axios.post(
           "/api/v1/payment/process",
           paymentData,
           config
         );

         const client_secret = data.client_secret;

         if (!stripe || !elements) return;

         const result = await stripe.confirmCardPayment(client_secret, {
           payment_method: {
             card: elements.getElement(CardNumberElement),
             billing_details: {
               name: user.name,
               email: user.email,
               address: {
                 line1: shippingInfo.address,
                 city: shippingInfo.city,
                 state: shippingInfo.state,
                 postal_code: shippingInfo.pinCode,
                 country: shippingInfo.country,
               },
             },
           },
         });

         if (result.error) {
           payBtn.current.disabled = false;
           alert.error(result.error.message);
         } else {
           if (result.paymentIntent.status === "succeeded") {
             order.paymentInfo = {
               id: result.paymentIntent.id,
               status: result.paymentIntent.status,
             };
             
              dispatch(createOrder(order));

              dispatch({type: EMPTY_CART});

            history.push("/success");
           } else {
             alert.error("There's some issue while processing payment ");
           }
         }
       } catch (error) {
         payBtn.current.disabled = false;
         alert.error(error.response.data.message);
       }
     };

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, error, alert]);

    return (
      <Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <Typography>Card Info</Typography>
            <div>
              <CreditCardIcon />
              <CardNumberElement className="paymentInput" options={options} />
            </div>
            <div>
              <EventIcon />
              <CardExpiryElement className="paymentInput" options={options} />
            </div>
            <div>
              <VpnKeyIcon />
              <CardCvcElement className="paymentInput" options={options} />
            </div>

            <button
              type="submit"
              ref={payBtn}
              className="paymentFormBtn"
            >{`Pay - $${orderInfo && orderInfo.totalPrice}`}</button>
          </form>
        </div>
      </Fragment>
    );
}

export default Payment;