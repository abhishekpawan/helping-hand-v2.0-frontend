import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import TopBar from "../TopBar/TopBar";
import "./AvailableFoodsPage.css";

const AvailableFoodsPage = () => {
  const { isUserLocationAvailable, isUserLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLocationAvailable == false) {
      navigate("/");
    }
  }, [isUserLocationAvailable]);

  return (
    <main className="availablefoods">
      <TopBar />
      {/* <div>AvailableFoodsPage</div> */}
    </main>
  );
};

export default AvailableFoodsPage;
