import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom"; // useHistory
import "../styles.scss";
import axios from "axios";
import logo from "../assets/blueParq.png";
import profile from "../assets/profile.png";
import topoBackground from "../assets/topoBackground.png";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import LoginPopup from "./LoginPopup.jsx";
import AboutPage from "./About.jsx";
import Host from "./Host.jsx";
import ParkingSpotTest from "./ParkingSpotTest.jsx";
import ProfileTile from "./ProfileTile.jsx";
// import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [listings, setListings] = useState([]);

  // check if there is a access_token in the session storage
  const access_token = window.sessionStorage.getItem("access_token");

  useEffect(() => {
    setLoggedIn(access_token ? true : false);

    // get listing and booking data associated with current user
    axios
      .get("/api/profile", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log("axios response length of array...", res);
        // setData(res.data);
        setBookings(res.data.bookings);
        setListings(res.data.listings);
      })
      .catch((err) => {
        console.log(`Error occured in Axios request: ${err}`);
      });
  }, []);

  console.log(listings);

  let history = useHistory();

  const handleLogout = (e) => {
    // prevent refresh of the screen
    e.preventDefault();
    window.sessionStorage.removeItem("access_token");
    history.push({
      pathname: "/",
    });
  };


  const upcomingBookings = bookings.map((ele, i) => {
    const { bookingDate} = ele;
    const colorPicker = "upcoming";

      const pickedDate = Date.parse(bookingDate.replace(/-/g, " "));
      const todaysDate = new Date();
      todaysDate.setHours(0, 0, 0, 0);
      const dateDifference =Number(todaysDate) - pickedDate;
      
      if (dateDifference <= 0) {
        return <ProfileTile id="profileTileUpcoming" key={i} info={ele} colorPicker={colorPicker} />;
      }
  });

  const pastBookings = bookings.map((ele, i) => {
    const { bookingDate} = ele;
    const colorPicker = "past";

      const pickedDate = Date.parse(bookingDate.replace(/-/g, " "));
      const todaysDate = new Date();
      todaysDate.setHours(0, 0, 0, 0);
      const dateDifference = Number(todaysDate) - pickedDate;

      if (dateDifference >= 0) {
        return <ProfileTile id="profileTilePast" key={i} info={ele} colorPicker={colorPicker} />;
      }
  });

  const currentListings = listings.map((ele, i) => {
    const colorPicker = "current";
    return <ProfileTile id="profileTileCurrent" key={i} info={ele} colorPicker={colorPicker} />
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="navBar" style={{ height: "70px" }} sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar>
            <Button color="inherit" sx={{ flexGrow: 1 }}>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    textTransform: "none",
                    fontWeight: "light",
                    color: "#36454F",
                  }}
                >
                  book
                </Typography>
              </Link>
            </Button>
            <Button color="inherit" sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textTransform: "none",
                  fontWeight: "light",
                  color: "#36454F",
                }}
              >
                <Host />
              </Typography>
            </Button>
            <Link to="/">
              <Button>
                <img className="websiteLogo" src={logo} />
              </Button>
            </Link>
            <Button color="inherit" sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textTransform: "none",
                  fontWeight: "light",
                  color: "#36454F",
                }}
              >
                <AboutPage />
              </Typography>
            </Button>
            <Button color="inherit" sx={{ flexGrow: 1 }}>
              {loggedIn === false && (
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    textTransform: "none",
                    fontWeight: "light",
                    color: "#36454F",
                  }}
                >
                  <LoginPopup />
                </Typography>
              )}
              {loggedIn === true && (
                <Button onClick={handleLogout}>
                  {/* <img className="profile" src={profile}></img> */}
                  <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    textTransform: "none",
                    fontWeight: "light",
                    color: "#36454F",
                  }}
                >logout
                </Typography>
                </Button>
              )}
            </Button>
          </Toolbar>
        </Box>
      </div>

      <div className="upcomingBookings">
        <p>upcoming bookings</p>
        <div className="scrolling-wrapper">
            {upcomingBookings}
        </div>
      </div>
      <div className="pastBookings">
        <p>past bookings</p>
        <div className="scrolling-wrapper">
            {pastBookings}
        </div>
      </div>
      <div className="currentListings">
        <p>my current listings</p>
            <div className="scrolling-wrapper">
              {currentListings}
            </div>
      </div>
    </div>
  );
}
