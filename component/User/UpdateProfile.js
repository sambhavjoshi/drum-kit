import React, { Fragment, useRef, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import appStore from "../../images/playStore.png"
import {clearErrors,loadUser,login,updateProfile} from "../../actions/userActions"
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";


const UpdateProfile = ({history}) =>{
    const dispatch = useDispatch();
    const alert = useAlert();

    const {user} = useSelector(state => state.user);
    const {error,loading,isUpdated} = useSelector(state => state.profile);
    const User = Array.isArray(user) ? user[0] : user;

    const [avatar,setAvatar] = useState("abc");
    const [avatarPreview,setAvatarPreview] = useState(appStore);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    const updateProfileSubmit = (e) =>{
        e.preventDefault();
       try{ const myForm = new FormData();
  
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar",avatar);
        dispatch(updateProfile(myForm));
       }
       catch(error){
        alert.error(error);
       }
      };
  
      const updateProfileDataChange = (e) =>{
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);             
              reader.onload = () =>{
                      if(reader.readyState === 2){
                        setAvatarPreview(reader.result);
                        setAvatar(reader.result);
                      }
              }
  
           
        
      }
  
  
  
      useEffect(()=>{
              if(error){
                alert.error(error);
                dispatch(clearErrors());
              }

              if(User) {
                setName(User.name);
                setEmail(User.email); 
                try{
                    setAvatarPreview(User.avatar.url);
                }
                catch(error){
                    setAvatarPreview(appStore);
                }
                //if user exists then fill it initially
              }
  
              if(isUpdated){
                alert.success("Profile updated successfully");
                dispatch(loadUser());
                history.push("/account");
                dispatch({type: UPDATE_PROFILE_RESET});
              }
      },[alert,dispatch,error,history,User,isUpdated]);
  
  
      return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title="Update Profile" />
              <div className="updateProfileContainer">
                <div className="updateProfileBox">
                  <h2 className="updateProfileHeading">Update Profile</h2>
    
                  <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                  >
                    <div className="updateProfileName">
                      <FaceIcon />
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="updateProfileEmail">
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
    
                    <div id="updateProfileImage">
                      <img src={avatarPreview} alt="Avatar Preview" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Update"
                      className="updateProfileBtn"
                    />
                  </form>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      );
}

export default UpdateProfile;