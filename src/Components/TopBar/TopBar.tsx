import React, { useContext } from "react";
import { MdLocationOn } from "react-icons/md";
import { AppContext } from "../../App";
import "./TopBar.css";

const TopBar = () => {
  const { location, locationData } = useContext(AppContext);
  console.log(locationData);
  return (
    <>
      <div className="topbar d-flex justify-content-between align-items-center">
        <div className="location d-flex justify-content-center align-items-center">
          <div className="icon">
            <MdLocationOn />
          </div>
          <div className="address">{locationData?.formatted_address}</div>
        </div>
        <div className="add-food-btn">
          <button>Add Food</button>
        </div>
      </div>
    </>
  );
};

export default TopBar;
