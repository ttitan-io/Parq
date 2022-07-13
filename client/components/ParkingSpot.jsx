import React, { useState } from "react";
import topoBackground from "../assets/topoBackground.png";
import { Link } from "react-router-dom";

const ParkingSpot = ({ address, isVisible }) => {

  const onSpotClick = (e) => {
    console.log(address);
    
  };

  return (
    <div className="parkingSpotTile" onClick={onSpotClick}>
      <img className="tileTopo" src={topoBackground} width="100%"></img>
      <span>
        <h1 className="spotAddress">{address}</h1>
      </span>
    </div>
  );
};

export default ParkingSpot;
