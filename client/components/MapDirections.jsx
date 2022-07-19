import React, { Component, useContext, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader"
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { mapStyles } from "../assets/mapsStyles";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
//   float: "left",
// };

// const options = {
//   styles: mapStyles,
// };

// const loader = new Loader({
//   apiKey: "AIzaSyADsm4pETi_2Ja_1LHGQae6MGBY2SU1UOk",
//   version: "weekly",
//   // ...additionalOptions,
// });

// loader.load().then(() => {
//   directionalMap = new google.maps.Map(document.getElementById("directionalMap"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
//   console.log('directionalMap...', directionalMap)
// });

// export class DirectionalMapContainer extends Component {
//     render() {
//     return (
//         <div id="directionalMap"></div>
//     );
//     }
// }



import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>Irvine, CA</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyADsm4pETi_2Ja_1LHGQae6MGBY2SU1UOk"
})(MapContainer)

// let map, infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//   });
//   infoWindow = new google.maps.InfoWindow();

//   const locationButton = document.createElement("button");

//   locationButton.textContent = "Pan to Current Location";
//   locationButton.classList.add("custom-map-control-button");
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//   locationButton.addEventListener("click", () => {
//     // Try HTML5 geolocation.
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           infoWindow.setPosition(pos);
//           infoWindow.setContent("Location found.");
//           infoWindow.open(map);
//           map.setCenter(pos);
//         },
//         () => {
//           handleLocationError(true, infoWindow, map.getCenter());
//         }
//       );
//     } else {
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter());
//     }
//   });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }

// window.initMap = initMap;