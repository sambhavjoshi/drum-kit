import React, { Fragment, useEffect } from "react";
import { useSelector} from "react-redux";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";



const ProtectedRoute = ({component:Component, isAdmin,...rest}) => {
     const {loading,isAuthenticated,user} = useSelector((state) => state.user);
     
     const User = Array.isArray(user) ? user[0] : user;


     
     return (
         <Fragment>
            {loading===false && (
                <Route {...rest} render = {(props) =>{
                    if(isAuthenticated===false){
                        return <Redirect to="/login"/>
                    }
                    if(isAdmin === true && User.role !== "admin"){
                        return <Redirect to="/login" />
                        
                    }
                    return <Component {...props} />;
                }}
                />
            ) }
         </Fragment>
     );

};

export default ProtectedRoute;