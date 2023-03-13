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

const containerStyle = {
  width: "800px",
  height: "500px",
};

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY!,
  });
  const { locationData, location, setLocation, setUserLocationAvailable } =
    useContext(AppContext);
  const currentLocation: IPosition = {
    lat: locationData.geometry.location.lat,
    lng: locationData.geometry.location.lng,
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
      console.log(suggestion.formatted_address);
      localStorage.setItem("location", JSON.stringify(suggestion));
    } catch (error: any) {
      showNotification("error", error.toString());
    }
  };

  return isLoaded ? (
    <>
      <h1>{location?.formatted_address}</h1>
      <button
        onClick={() => {
          map.panTo(currentLocation);
          setMarkerPosition(currentLocation);
        }}
      >
        current location
      </button>
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
      {/* <Link to="/">
        <button>Confirm</button>
      </Link> */}
    </>
  ) : (
    <></>
  );
};

export default MapPage;
