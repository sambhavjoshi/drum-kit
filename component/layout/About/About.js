import React from "react";
import "./About.css";
import { Typography, Avatar } from "@material-ui/core";
import cf from "../../../images/cf.png";
import cc from "../../../images/cc.png";
import leetcode from "../../../images/leetcode.png";
import gfg from "../../../images/gfg.png";
import github from "../../../images/github.png";

const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dfjpuytkb/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_white,b_rgb:262c35/v1688746980/avatars/sambhav1_gxvbc8.jpg"
              alt="Founder"
            />
            <Typography>Sambhav Joshi</Typography>
            <a
              href="https://drive.google.com/file/d/1ViT1otbQzVBf5G-n1R3jLqwFyuEuO26J/view?usp=drive_link"
              target="_blank"
              color="primary"
              className="resume"
            >
              Have a look at my Resume
            </a>
            <span>
              I am Satya Sambhav Joshi, a student of NIT Raipur. I am pursuing
              my BTech in I.T major. I boast a proficient knowledge of Data
              Structures and Algorithm , OOPS , OS , DBMS. with MERN Stack I am
              a full stack developer.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My Profiles</Typography>
            <a href="https://github.com/sambhavjoshi" target="blank">
              <img src={github} />
            </a>

            <a href="https://leetcode.com/aerondight9/" target="blank">
              <img src={leetcode} />
            </a>

            <a
              href="https://auth.geeksforgeeks.org/user/sambhavjxyxl"
              target="blank"
            >
              <img src={gfg} />
            </a>

            <a href="https://codeforces.com/profile/kratos2003" target="blank">
              <img src={cf} />
            </a>

            <a href="https://www.codechef.com/users/kratos2003" target="blank">
              <img src={cc} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
