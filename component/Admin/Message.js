import "./Message.css"
import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import "./ProcessOrder.css";
import { getSingleContact , clearErrors } from "../../actions/contactAction";

const Message = ({ match }) => {
  const { contact, error, loading } = useSelector((state) => state.singleContact);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getSingleContact(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  var Date = "";
  var Time = "";

  try{
    Date = contact.createdAt.slice(0,10);
    Time = contact.createdAt.slice(12,19);
  }
  catch(error){
     Date = "";
     Time = "";
  }

  return (
    
    <Fragment>
      <MetaData title="message" />
      <div className="dashboard">
        <SideBar />
        <div className="messageContainer">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
                <div className="heading">
                    <div className="name">
                      <p>{contact.name}</p>
                    </div>  
                    <div className="address">
                        <p>{contact.address}</p>
                    </div>
                    <div className="date">
                        <p>{Date}</p>
                    </div>
                    <div className="time">
                       <p>{Time}</p>
                    </div>
                </div>
                <div className="message">
                    <p>{contact.message}</p>
                </div>    
              </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Message;
