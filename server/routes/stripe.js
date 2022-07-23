const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const cookieController = require("../controllers/cookieController");
const stripeController = require("../controllers/stripeController");

router.post("/create-payment-intent", stripeController.createPaymentIntent, (req, res) => {
  return res.status(200).json({clientSecret: res.locals.paymentIntent.client_secret});
});

module.exports = router;
