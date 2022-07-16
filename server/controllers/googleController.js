const express = require("express");
const axios = require("axios");

const googleRequestController = {};

googleRequestController.mapLocation = (req, res, next) => {
  try {
    const { address } = req.body;
    console.log("location is:", address);
    // const location = "202 Grand Bld Brentwood NY 11717";
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json?", {
        params: {
          address: address,
          key: process.env.GOOGLE_API_KEY,
        }
      })
      .then(response => {
        // console.log("response results [0]:", response.data.results[0]);
        res.locals.data = response.data.results[0].geometry.location;
        return next();
      })
      .catch((err) => console.log(err));
  } catch (err) {
    return next({
      log: "googleRequestController.mapLocation: ERROR: Error getting coordinates data from file",
      message: {
        err: `Error occurred in "" err log: ${err}`,
      },
    });
  }
};

// returns approximate lat/lng based on IP address, and accuracy. Can receive more from req.body to increase accuracy... https://developers.google.com/maps/documentation/geolocation/overview#body
googleRequestController.geolocation = (req, res, next) => {
  try {
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_API_KEY}`)
      .then(response => {
        res.locals.geolocation = response.data;
        console.log('Response from geolocation...', response.data);
        return next();
      })
  } catch (err) {
    console.log(`Error in geolocation... ${err}`);
  }
}

// googleRequestController.getDirections = (req, res, next) => {
  
//   // TEST for passing in latitude and longitude in URL with template literals //
//   // var orgLat = res.locals.geolocation.lat 
//   // var orgLng = 
//   const orgLat = 41.43206;
//   const orgLng = -81.38992;

//   try {
//     axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${orgLat},${orgLng}&destination=place_id:ChIJ3S-JXmauEmsRUcIaWtf4MzE`, {
//       params: {
//         key: process.env.GOOGLE_API_KEY,
//         // origin: {lat: 41.43206, lng: -81.38992},
//         // destination: 
//       }
//     })
//       .then(response => {
//         res.locals.directions = response.data;
//         console.log('Response from getDirections...', response.data);
//       })
//   } catch (err) {
//     console.log('Error in getDirections...', err)
//   }
// }

module.exports = googleRequestController;
