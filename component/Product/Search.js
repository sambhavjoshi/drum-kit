import React, { useState,Fragment } from "react";
import "./Search.css"
import MetaData from "../layout/MetaData";

const Search = ({history}) => {
       const [keyword,setKeyword] = useState("");

       const searchSubmitHandler = (e)=>{
            e.preventDefault(); // form submit hone pe data gyb nhi hoga
            if(keyword.trim()){   // trim se pehle ke spaces gyb
                history.push(`/products/${keyword}`);
            }
            else history.push("/products");
       };
       return (
        <Fragment>
             <MetaData title="Search a Product" />
             <form className="searchBox" onSubmit={searchSubmitHandler}>
                   <input type = "text" placeholder="Search" onChange={(e) => setKeyword(e.target.value)}
                   />
                   <button type="submit" className="searchBtn">Search</button>
             </form>
        </Fragment>
       );
}

export default Search;