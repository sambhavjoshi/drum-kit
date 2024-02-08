import { Rating } from "@material-ui/lab";
import React from "react";
import ReactStars from "react-rating-stars-component";
import profile from "../../images/profile.png";

const ReviewCard = ({review}) =>{
    const options = {
      value: review.rating,
      readOnly: true,
      precision: 0.25,
    };

    return (
    <div className="reviewCard">
         <img src = {profile} alt = "user"/>
         <p>{review.name}</p>
         <Rating {...options} />
         <span className="reviewCardComment">{review.comment}</span>
    </div>
    );
};

export default ReviewCard;

// backend main ye krdo ki review ke saath
// id,name aur image teeno save hojae fir image toh
// nikal hi lenge