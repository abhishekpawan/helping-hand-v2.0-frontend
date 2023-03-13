import React, { useCallback, useContext, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { IPosition } from "../../utils/interface";
import { AppContext } from "../../App";
import { showNotification } from "../../utils/ToastNotification";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { MdDoneAll, MdLocationOn } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
const containerStyle = {
  width: "100vw",
  height: "68vh",
};

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY!,
  });
  const { locationData, location, setLocation, setUserLocationAvailable } =
    useContext(AppContext);
  const [isSpinning, setSpining] = useState<boolean>(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
  );
  const [currentLocation, setCurrentLocation] = useState<IPosition>({
    lat: locationData.geometry.location.lat,
    lng: locationData.geometry.location.lng,
  });

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
        setCurrentLocation({
          lat: suggestion.geometry.location.lat,
          lng: suggestion.geometry.location.lng,
        });
        setMarkerPosition({
          lat: suggestion.geometry.location.lat,
          lng: suggestion.geometry.location.lng,
        });
        setLocation(suggestion);
        localStorage.setItem("location", JSON.stringify(suggestion));
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

  const [map, setMap] = useState<any>(null);
  const [markerPosition, setMarkerPosition] =
    useState<IPosition>(currentLocation);
  const [newLocation, setNewLocation] = useState<IPosition>();
  const onClick = () => {};
  const onDragEnd = async (e: any) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setMarkerPosition({
      lat,
      lng,
    });
    setNewLocation({
      lat,
      lng,
    });
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
    try {
      let response = await fetch(apiUrl);
      const data = await response.json();
      let suggestion = data.results[0];
      setLocation(suggestion);
      localStorage.setItem("location", JSON.stringify(suggestion));
    } catch (error: any) {
      showNotification("error", error.toString());
    }
  };

  return isLoaded ? (
    <>
      <div className="location d-flex justify-content-start align-items-center">
        <div className="icon">
          <MdLocationOn />
        </div>
        <div className="address">{location?.formatted_address}</div>
      </div>

      <div className="map-container mt-3 d-flex justify-content-center align-items-center">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={19}
          onClick={onClick}
          onLoad={(map) => setMap(map)}
          //   onUnmount={onUnmount}
          clickableIcons={false}
          options={{
            streetViewControl: false,
          }}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <>
            <Marker
              position={markerPosition}
              // onPositionChanged={onPositionChanged}
              draggable
              onDragEnd={onDragEnd}
            />
          </>
        </GoogleMap>
      </div>
      <div className="locate-me-btn  d-flex justify-content-end align-items-center ">
        <button
          className="me-3"
          onClick={() => {
            getCurrentLocation();
            setMarkerPosition(currentLocation);
          }}
        >
          {isSpinning ? (
            antIcon
          ) : (
            <>
              <BiCurrentLocation /> Locate Me
            </>
          )}
        </button>
        <button data-bs-dismiss="modal" aria-label="Close">
          <MdDoneAll /> Done
        </button>
      </div>
    </>
  ) : (
    <></>
  );
};

export default MapPage;
