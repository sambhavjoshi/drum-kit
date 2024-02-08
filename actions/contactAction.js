import {
  ALL_CONTACT_FAIL,
  ALL_CONTACT_REQUEST,
  ALL_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CLEAR_ERRORS,
  SINGLE_CONTACT_FAIL,
  SINGLE_CONTACT_REQUEST,
  SINGLE_CONTACT_SUCCESS
} from "../constants/contactConstants";
import axios from "axios";

export const createContact = (contactData) => async(dispatch)=>{
    try{

        dispatch({ type: CREATE_CONTACT_REQUEST });

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post("/api/v1/contact/create", contactData, config);
        dispatch({ type: CREATE_CONTACT_SUCCESS, payload: data.success });
    }
    catch(error){
        dispatch({
          type: CREATE_CONTACT_FAIL,
          payload: error.response.data.message,
        });
    }
};


//get all images
export const getAllContacts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CONTACT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/inbox");
    dispatch({ type: ALL_CONTACT_SUCCESS, payload: data.contacts });
  } catch (error) {
    dispatch({
      type: ALL_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Delete Contact
export const deleteSingleContact = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CONTACT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/contact/${id}`);

    dispatch({
      type: DELETE_CONTACT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get single contact
export const getSingleContact = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_CONTACT_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/contact/${id}`);

    dispatch({
      type: SINGLE_CONTACT_SUCCESS,
      payload: data.contact,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};