const express = require("express");
const { User } = require("../models/userModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const loginController = {};

loginController.loginUser = async (req, res, next) => {
  try {
    const { username } = req.body;
    //verify username
    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).send({ message: "Invalid username or password" });
    //verify password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid username or password" });

    return next();
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// loginController.createToken = (req, res, next) => {
//   const { username } = req.body;
//   const token = username.generateAuthToken();
//   console.log("Checking Token:", token)
//   User.updateOne({ username }, { token }, (err, docs) => {
//     if (err) return next(err);
//     res.locals.data = token;
//     console.log("res.locals.data:", res.locals.data)
//     return next();
//   });
// };

// loginController.isLoggedIn = (req, res, next) => {
//     const {username} = req.body
//     User.findOne({username})
// };

module.exports = loginController;
