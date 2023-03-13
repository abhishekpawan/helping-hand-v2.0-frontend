import React, { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import HelpingHandLogo from "../../Assets/HelpingHandLogo.png";
import PlacesAutocomplete from "react-places-autocomplete";
import TextTransition, { presets } from "react-text-transition";
import { CiLocationOn } from "react-icons/ci";
import { showNotification } from "../../utils/ToastNotification";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { MdLocationOn } from "react-icons/md";
const TEXTS = [
  "Let's feed the hungry before we feed our egos.",
  "The food you waste is the food they need.",
  "Food waste is a luxury we can't afford when so many go without.",
  "The food we waste today could have fed someone tomorrow.",
];

const HomePage = () => {
  const {
    location,
    locationData,
    isUserLoggedIn,
    isUserLocationAvailable,
    setUserLocationAvailable,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [addressObj, setAddressObj] = useState<any>();
  const [isSpinning, setSpining] = useState<boolean>(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 34, color: "#002047" }} spin />
  );
  useEffect(() => {
    if (isUserLoggedIn === true && isUserLocationAvailable === true) {
      navigate("/availableFoods");
    }
  }, [isUserLoggedIn, isUserLocationAvailable]);
  const handleChange = (value: string) => {
    setAddress(value);
  };

  const handleSelect = (
    address: string,
    placeId?: string,
    suggestion?: object
  ) => {
    setAddress(address);
    setAddressObj(suggestion);
  };

  const handleError = (status: string, clearSuggestions: VoidFunction) => {
    if (status.toString() === "ZERO_RESULTS")
      showNotification("error", "No results found! Please try again!");
    clearSuggestions();
  };

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const confirmLocation = async () => {
    if (address.length > 0) {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${addressObj?.placeId}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
      try {
        let response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        let suggestion = data.results[0];
        setSpining(false);
        setAddress(suggestion.formatted_address);
        setAddressObj(suggestion);
        localStorage.setItem("location", JSON.stringify(suggestion));
        setUserLocationAvailable(true);
        if (isUserLoggedIn === true) {
          navigate("/availableFoods");
        } else {
          navigate("/");
        }
      } catch (error: any) {
        showNotification("error", error.toString());
      }
    } else {
      showNotification("info", "Please enter your location!");
    }
  };

  const getCurrentLocation = () => {
    setSpining(true);
    var locationOptions = {
      enableHighAccuracy: true,
      // timeout: 5000,
      maximumAge: 0,
    };
    const success = async (position: any) => {
      // console.log(position);
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
      try {
        let response = await fetch(apiUrl);
        const data = await response.json();
        let suggestion = data.results[0];
        setSpining(false);
        setAddress(suggestion.formatted_address);
        setAddressObj(suggestion);
        localStorage.setItem("location", JSON.stringify(suggestion));
        setUserLocationAvailable(true);
        if (isUserLoggedIn === true) {
          navigate("/availableFoods");
        } else {
          navigate("/");
        }
      } catch (error: any) {
        showNotification("error", error.toString());
      }
    };
    function error(err: any) {
      console.warn(
        `ERROR(${err.code}): ${err.message}, Unable to retrieve your location`
      );
      alert(
        `ERROR(${err.code}): ${err.message}, Unable to retrieve your location`
      );
    }
    navigator.geolocation.getCurrentPosition(success, error, locationOptions);
  };

  const locationChange = () => {
    localStorage.removeItem("location");
    setUserLocationAvailable(false);
  };
  return (
    <main className="homepage d-flex flex-column align-items-center">
      <div className="logo">
        <img src={HelpingHandLogo} alt="" />
      </div>
      <Spin indicator={antIcon} spinning={isSpinning}>
        <div className="location-search-container d-flex align-items-center justify-content-center">
          <div className="location-search d-flex flex-column align-items-center justify-content-center">
            {isUserLocationAvailable ? (
              <div className=" d-flex flex-column align-items-center justify-content-center">
                <h1>Your current location is:</h1>
                <div className="location d-flex justify-content-center align-items-center">
                  <div className="icon">
                    <MdLocationOn />
                  </div>
                  <div className="address">
                    {locationData?.formatted_address}
                  </div>
                </div>
                <button onClick={locationChange} className="change-btn">
                  Change
                </button>
                <h1 className="pt-3 fw-bold">Login or Signup to continue...</h1>
              </div>
            ) : (
              <>
                <PlacesAutocomplete
                  value={address}
                  onChange={handleChange}
                  onSelect={handleSelect}
                  onError={handleError}
                  searchOptions={{
                    componentRestrictions: { country: ["in"] },
                  }}
                  shouldFetchSuggestions={address.length >= 2}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        {...getInputProps({
                          id: "locationSearch",
                          placeholder: "Enter your location",
                        })}
                      />
                      <div>
                        {loading && <div>Loading...</div>}
                        <div className="search-suggestions">
                          {suggestions.map((suggestion, index) => {
                            // console.log(suggestion);
                            return (
                              <div
                                className="single-search-suggestions d-flex align-items-start justify-content-start"
                                {...getSuggestionItemProps(suggestion)}
                              >
                                <div className="icon">
                                  <CiLocationOn />
                                </div>
                                {suggestion.description}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                {/* <button className="locate-me-btn">Locate Me</button> */}
                <div className="d-flex buttons">
                  <button onClick={confirmLocation}>Confirm Location</button>
                  <button onClick={getCurrentLocation}>Locate Me</button>
                </div>
              </>
            )}
          </div>
        </div>
      </Spin>
      <div className="quotes">
        <h1>
          <TextTransition springConfig={presets.gentle}>
            {TEXTS[index % TEXTS.length]}
          </TextTransition>
        </h1>
        <p>Food waste and hunger are two sides of the same coin.</p>
      </div>
      <div className="banner"></div>
    </main>
  );
};

export default HomePage;
