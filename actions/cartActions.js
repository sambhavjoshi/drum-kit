import {ADD_TO_CART,REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants"
import axios from "axios";
import logo from "../images/logo.png";

// add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    let imgurl = logo;
    try{
        imgurl = data.product.images[0].url;
    }
    catch(error) {
        imgurl = logo;
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,//using product as id
        name: data.product.name,
        price: data.product.price,
        image: imgurl  ,
        stock: data.product.stock,
        discount: data.product.discount,
        quantity,
      },
    });
  //we can access state using getstate
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  // REMOVE FROM CART
  export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

  // save shipping info
  export const saveShippingInfo = (data) => async (dispatch) => {
         dispatch({
          type:SAVE_SHIPPING_INFO,
          payload:data
         })

         localStorage.setItem("shippingInfo",JSON.stringify(data));
  }