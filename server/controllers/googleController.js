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
          key: "AIzaSyADsm4pETi_2Ja_1LHGQae6MGBY2SU1UOk",
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

module.exports = googleRequestController;
