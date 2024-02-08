import React, { useEffect, useState } from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { clearErrors, createContact } from "../../../actions/contactAction";
import { CREATE_CONTACT_RESET } from "../../../constants/contactConstants";

const Contact = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const User = Array.isArray(user) ? user[0] : user;
  const { loading, error, success } = useSelector((state) => state.newContact);

  const createContactSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("address", address);
    myForm.set("message", message);

    dispatch(createContact(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (User) {
      setName(User.name);
      setAddress(User.email);
    }

    if (success) {
      alert.success("Message Dropped Successfully");
      history.push("/");
      dispatch({ type: CREATE_CONTACT_RESET });
    }
  }, [dispatch, alert, error, history, success, User]);

  return (
    <div className="contactContainer">
      <div className="heading">
        <div className="mail">
          <p>you may mail me</p>
          <a href="mailto:sambhavjoshi26@gmail.com" target="_blank">
            here
          </a>
        </div>
        <p>or leave a message below</p>
      </div>

      <div>
        <form className="messageForm" onSubmit={createContactSubmitHandler}>
          <div className="Name">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="Address">
            <input
              type="text"
              placeholder="Email/Phone"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="Message">
            <textarea
              placeholder="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              cols="23"
              rows="3"
            />
          </div>
          <button type="submit" className="Drop">
            Drop
          </button>
        </form>
      </div>

      <div className="foot">
        <p>
          The fact that you reached here to contact me. I am really grateful to
          you!
        </p>
      </div>
    </div>
  );
};

export default Contact;
