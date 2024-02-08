import React from "react";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";
import "./Footer.css";
import leetcode from "../../../images/leetcode.png";
import Linkedin from "../../../images/Linkedin.png";
import instagram from "../../../images/instagram.png"
import { useSelector } from "react-redux";

const Footer = () =>{

    const {mode} = useSelector(state => state.mode);
    return (
      <footer id="footer">
        <div className="leftFooter">
          <h4>Download our app</h4>
          <p>Download App for Android and IOS systems</p>
          <img src={playStore} alt="playStore" />
          <img src={appStore} alt="appStore" />
        </div>
        <div className="midFooter">
          <h1 className={`mode${mode}`}>Origins</h1>
          <p className={`mode${mode}`}>A treasure of Sports Items</p>

          <span>Copyrights 2023 &copy; sambhav_joshi </span>
        </div>
        <div className="rightFooter">
          <h4>Follow me</h4>
          <a href="https://www.instagram.com/_sambhav_joshi/" target="_blank">
            <img src={instagram} className={`mode${mode}`} />
          </a>
          <a href="https://leetcode.com/aerondight9/" target="_blank">
            <img src={leetcode} className={`mode${mode}`} />
          </a>
          <a
            href="https://www.linkedin.com/in/sambhav-joshi-022653258/"
            target="_blank"
          >
            <img src={Linkedin} className={`mode${mode}`} />
          </a>
        </div>
      </footer>
    );
};

export default Footer; 