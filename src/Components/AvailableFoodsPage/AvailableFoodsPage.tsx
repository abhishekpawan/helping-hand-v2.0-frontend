import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import FoodCard from "../FoodCard/FoodCard";
import TopBar from "../TopBar/TopBar";
import "./AvailableFoodsPage.css";
import { useAppSelector } from "../../redux/store/store";
import { getDistanceFromLatLonInKm } from "../../utils/GetDistanceFromLatLng";

const AvailableFoodsPage = () => {
  const { isUserLocationAvailable, locationData } = useContext(AppContext);
  const navigate = useNavigate();
  const { foods } = useAppSelector((store) => store.foods);

  const sortedFoods = [...foods];
  sortedFoods.sort((a, b) => {
    const distanceA = getDistanceFromLatLonInKm(
      locationData.geometry.location.lat,
      locationData.geometry.location.lng,
      a.location.geometry.location.lat,
      a.location.geometry.location.lng
    );
    const distanceB = getDistanceFromLatLonInKm(
      locationData.geometry.location.lat,
      locationData.geometry.location.lng,
      b.location.geometry.location.lat,
      b.location.geometry.location.lng
    );
    return distanceA - distanceB;
  });

  useEffect(() => {
    if (isUserLocationAvailable == false) {
      navigate("/");
    }
  }, [isUserLocationAvailable]);

  return (
    <main className="availablefoods">
      <TopBar />
      <div className="foodcards">
        {sortedFoods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </main>
  );
};

export default AvailableFoodsPage;
