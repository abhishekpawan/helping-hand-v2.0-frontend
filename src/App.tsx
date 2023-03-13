// @ts-ignore
import scriptLoader from "react-async-script-loader";
import React, { createContext, FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Login&Signup/Login";
import DefaultLayout from "./Layout/DefaultLayout";
import { UserData } from "./utils/interface";

import "./App.css";
import Signup from "./Components/Login&Signup/Signup";
import MapPage from "./Components/HomePage/MapPage";
import AvailableFoodsPage from "./Components/AvailableFoodsPage/AvailableFoodsPage";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";
export const AppContext = createContext<any>(null);
// @ts-ignore
const App = ({ isScriptLoaded, isScriptLoadSucceed }) => {
  const userData: UserData = JSON.parse(localStorage.getItem("user")!);
  const [user, setUser] = useState<UserData | null>(userData ? userData : null);
  const [isUserLoggedIn, setUserLoggedin] = useState<boolean>(
    user ? true : false
  );

  const locationData = JSON.parse(localStorage.getItem("location")!);
  const [location, setLocation] = useState<any>(
    locationData ? locationData : null
  );
  const [isUserLocationAvailable, setUserLocationAvailable] = useState<boolean>(
    location ? true : false
  );

  if (isScriptLoaded && isScriptLoadSucceed) {
    return (
      <>
        <AppContext.Provider
          value={{
            isUserLoggedIn,
            setUserLoggedin,
            user,
            setUser,
            locationData,
            isUserLocationAvailable,
            setUserLocationAvailable,
            location,
            setLocation,
          }}
        >
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="" element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="map" element={<MapPage />} />
              {isUserLoggedIn ? (
                <>
                  <Route
                    path="availableFoods"
                    element={<AvailableFoodsPage />}
                  />
                </>
              ) : (
                <></>
              )}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AppContext.Provider>
      </>
    );
  } else {
    return <div></div>;
  }
};

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`,
])(App);
