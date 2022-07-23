// This is your test secret API key.
const stripe = require("stripe")('sk_test_51LOTKAIdCYscPWvlrD4uDoI80fRTS3YJX1lDqh6WymJKNCFmJKA9JRHCEsh5EVQdvUm2nmeZ54nYNrOzpw0kMSZe00vlGtguEI');
  
const stripeController = {};

stripeController.createPaymentIntent = async (req, res, next) => {
  console.log('Made it to stripeController...')
  const { items } = req.body;
  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.locals.paymentIntent = paymentIntent;
  return next();
};

module.exports = stripeController;