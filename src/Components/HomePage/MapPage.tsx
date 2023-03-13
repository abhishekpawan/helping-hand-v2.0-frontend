import React, { useState } from "react";
import LocatorButton from "./LocatorButton";
import Map from "./Map";

const MapPage = () => {
  const [mapObject, setMapObject] = useState(null);
  return (
    <>
      {/* <LocatorButton mapObject={mapObject} /> */}
      <Map />
    </>
  );
};

export default MapPage;
