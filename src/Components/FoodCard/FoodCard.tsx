import React, { FC, useContext, useState } from "react";
import "./FoodCard.css";
import dummyThubmnail from "../../Assets/fried-rice.webp";
import veg from "../../Assets/veg.svg";
import nonveg from "../../Assets/non-veg.svg";
import { FaMotorcycle } from "react-icons/fa";
import Countdown, { zeroPad } from "react-countdown";
import { IFood } from "../../utils/interface";
import dayjs from "dayjs";
import { AppContext } from "../../App";
import { getDistanceFromLatLonInKm } from "../../utils/GetDistanceFromLatLng";

const FoodCard: FC<{ food: IFood }> = ({ food }) => {
  const Completionist = () => <span>Expired!</span>;

  const date = dayjs(food.foodDescription.foodPreprationTime);
  const time: any = date.add(1, "day");
  const { locationData } = useContext(AppContext);

  return (
    <div className="foodcard">
      <div className="row food-desc-container">
        <div className="col-12 col-md-3 thumbnail">
          <img src={dummyThubmnail} alt="" />
        </div>
        <div className="col-12 col-md-6 mt-3 mt-md-0 description d-flex flex-column justify-content-start">
          <div>
            <div className="title d-flex">
              {food.foodDescription.title}
              <div className="veg-logo">
                {food.foodDescription.foodType === "veg" ? (
                  <img src={veg} alt="" />
                ) : (
                  <img src={nonveg} alt="" />
                )}
              </div>
            </div>
            <div className="location d-flex align-items-end">
              <div className="icon">{/* <MdLocationOn /> */}</div>
              <div className="address ">{food.location.formatted_address}</div>
            </div>
            <div className="location distance d-flex align-items-end">
              <div className="icon">
                <FaMotorcycle />
              </div>
              <div className="address ms-3 mb-2">
                {parseFloat(
                  `${getDistanceFromLatLonInKm(
                    locationData.geometry.location.lat,
                    locationData.geometry.location.lng,
                    food.location.geometry.location.lat,
                    food.location.geometry.location.lng
                  )})`
                ).toFixed(2)}
                Km
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="cooked-at">
              <b>Cooked at: </b>
              {date.format("DD MMMM, hh:mm A")}
            </div>
            <div className="expired-in">
              <b>Expired in: </b>
              <Countdown
                date={new Date(time.format("MMMM DD YYYY, hh:mm"))}
                renderer={({ hours, minutes, seconds }) => (
                  <span>
                    {zeroPad(hours)}h {zeroPad(minutes)}m {zeroPad(seconds)}s
                  </span>
                )}
              >
                <Completionist />
              </Countdown>
            </div>
          </div>

          <div className="short-desc">1 bowl of fried rice</div>
          <hr className="d-block d-md-none dottedSeparator" />
        </div>

        <div className="col-12 user-desc-container col-md-3">
          <div className="row">
            <div className="col-12 user-desc">
              <b>Donated by:</b>
              <p>{food.user.name}</p>
              <p>{food.user.email}</p>
            </div>
            <hr className="dottedSeparator" />

            <div className="col-12 buttons d-flex flex-column align-items-end justify-content-end">
              <button>Select Food</button>
              <button>Get Direction</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row user-desc-container"></div> */}
    </div>
  );
};

export default FoodCard;
