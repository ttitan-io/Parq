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
        },
      })
      .then((response) => {
        console.log("response results [0]:", response.data.results[0]);
        res.locals.data = response.data.results[0].geometry.location;
        // console.log("Google fetch information:", res.data.data); // these are data from the API call
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

module.exports = googleRequestController;
