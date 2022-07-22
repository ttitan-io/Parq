const express = require("express");
const axios = require("axios");
const { response } = require("express");

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
<<<<<<< HEAD
        }
=======
        },
>>>>>>> dev
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

googleRequestController.reverseGeocode = async (req, res, next) => {
  const latLngStr = `${res.locals.geolocation.location.lat},${res.locals.geolocation.location.lng}`;
  console.log('latLngStr...', latLngStr)
  res.locals.reverseGeocode = {};
  try {
    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLngStr}&key=${process.env.GOOGLE_API_KEY}`)
      .then(response => {
        res.locals.revGeoLocation = response.data.results[0].place_id;
        // console.log('Response from reverseGeocode... place_id: ', res.locals.revGeoLocation)
        return next();
      })
  } catch (err) {
      console.log('Error in reverseGeocode...', err);
  }
}

googleRequestController.getDirections = (req, res, next) => {
  
  // TEST for passing in latitude and longitude in URL with template literals
  // const orgLat = 41.43206;
  // const orgLng = -81.38992;
  const origin = res.locals.revGeoLocation;

  try {
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?`, {//origin=Toronto&destination=Montreal&key=${process.env.GOOGLE_API_KEY}`, {
      params: {
        origin: `place_id:${origin}`,
        destination: 'Montreal',
        key: process.env.GOOGLE_API_KEY,
      }
    })
      .then(response => {
        res.locals.directions = response.data;
        console.log('Response from getDirections...', response.data);
        console.log('Response routes...', response.data.routes[0])
        return next();
      })
  } catch (err) {
    console.log('Error in getDirections...', err)
  }
}

module.exports = googleRequestController;
