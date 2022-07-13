Wednesday June 29th //

Task:

[] 1. Come up with Database design

- Need a User Schema (Unique username, password, email)
- Location will be used for both Host and Client
- Need a Booking Schema (Client (and/or Host?, Date of booking, location), password, email)
- Need a Location Schema (Address, Unique Username, price, parking options)

[X] 2. Setup the Database using atlas

[X] 3. Connect to MongoDB(mongoose)

[] 4. Set up server to test db users

[] 5. Research API for map and how to use it.

- Render large map and place marker for each location in DB (homepage)
- Render smaller map with selected location (stretch goal)
- Clicking on marker should display location info

Thursday June 30th //

Tasks:

Han & Tristan
[X] 1. Finalize the Database design

- Need a User Schema (Unique username, password, email)
- Location will be used for both Host and Client
- Need a Booking Schema (Client (and/or Host?, Date of booking, location), password, email)
- Need a Location Schema (Address, Unique Username, price, parking options)

[X] 2. Create location controller
[X] 3. Create Booking controller

Jake -

1.  Create user signup/login (Control

Saturday July 2nd //

Han & Tristan
[] 1. Create middleware for geocoding
[X] 2. Check middleware for GET/POST location/booking
[X] 3. Merge with Jake and finalize routers

We were able to use our controllers to make GET/POST requests to our database for our mock locations and bookings. After getting this working, we hopped into Jakes "Auth" code to help finalize his routes and modularize JWT functionality.

The next time we all come together, someone should work with the frontend team to match up our routes with their eventHandlers. The other backend team members will work on creating the fetch request to the google Geocode API and and add the middleware to our routes.

Tristan's research notes:

- Make axios request to the Google API url
- use object to set params which will be the address (given to us by the client input) and the API Key. Example below
- pass the google request controller as middleware for required routes.

googleRequestController.mapLocation = (req, res, next) => {
try {
const { lat, lng, address } = req.query;
axios
.get(
'https://maps.googleapis.com/maps/api/geocode/json?',
{
params: {
address: (Location from request body),
key: (API KEY)
}
}

      )
      .then((response) => {
        res.locals = response.data.results; // these are data from the API call
        return next();
      })
      .catch((err) => console.log(err));

} catch (err) {
return next({
log: 'googleRequestController.getBusinesses: ERROR: Error getting coordinates data from file',
message: {
err: `Error occurred in "" err log: ${err}`,
},
});

Tuesday July 5th //

[X] 1. Refactor authentication logic for JWT stored with mongoDB
[X] 2. Make HTTP request with maps API (use code above ^^^)

Tristan - Work with API fetch request
Jake - Work on Auth logic

Wednesday July 6th //

Auth has been tested and is ready to connect with frontend
HTTP request made to maps API successfully

[] 1. organize controllers to use API and DB correctly
