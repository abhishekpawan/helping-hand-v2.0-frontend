import React, { useContext } from "react";
import { MdLocationOn } from "react-icons/md";
import { AppContext } from "../../App";
import MapPage from "../HomePage/MapPage";
import "./TopBar.css";

const TopBar = () => {
  const { location, locationData } = useContext(AppContext);
  console.log(locationData);
  return (
    <>
      <div className="topbar row d-flex justify-content-between align-items-center">
        <div
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="col-12 col-md-6 location d-flex justify-content-center align-items-center"
        >
          <div className="icon">
            <MdLocationOn />
          </div>
          <div className="address">{locationData?.formatted_address}</div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-fullscreen-lg-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title ">
                  Drag the marker to your location!
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <button>English</button> */}
                <MapPage />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6  add-food-btn d-none d-md-flex justify-content-end align-items-center ">
          <button>Donate Food</button>
        </div>
      </div>
    </>
  );
};

export default TopBar;
