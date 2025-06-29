import React from "react";
import pic from "./pic.jpg"; // or .png, .svg
import "./Card.css";

const Card = () => {
  return (
    <div className="main">
      <div className="card1" style={{ width: "18rem" }}>
        <img src={pic} className="card-img-top" alt="..." />
      </div>
      <div className="card2" style={{ width: "18rem" }}>
        <img src={pic} className="card-img-top" alt="..." />
        <div className="card-body">
          <price>50$ OFF</price>
        </div>
      </div>
      <div className="card3" style={{ width: "18rem" }}>
        <img src={pic} className="card-img-top" alt="..." />
      </div>
      <div className="card4" style={{ width: "18rem" }}>
        <img src={pic} className="card-img-top" alt="..." />
      </div>
    </div>
  );
};

export default Card;
