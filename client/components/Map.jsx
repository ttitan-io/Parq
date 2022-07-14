import React, { Component, useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { mapStyles } from "../assets/mapsStyles";

const containerStyle = {
  width: "100%",
  height: "100%",
  float: "left",
};

const options = {
  styles: mapStyles,
};

export default function Map({ data, zoom }) {
  const center = {
    lat: data.lat,
    lng: data.lng,
  };
  const listings = data.listings;

  const markerElems = listings.map((listings, i) => {
    const position = {
      lat: listings.coordinates.lat,
      lng: listings.coordinates.lng,
    };

    const onMarkerClick = (e) => {
      console.log(listings.address);
    };

    return <Marker onClick={onMarkerClick} key={i} position={position} />;
  });

  return (
    <LoadScript googleMapsApiKey="AIzaSyADsm4pETi_2Ja_1LHGQae6MGBY2SU1UOk">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={options}
      >
        {markerElems}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}
