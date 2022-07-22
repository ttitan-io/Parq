import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { Link, Redirect, useHistory } from "react-router-dom";
import "../styles.scss";
import axios from "axios";
import logo from "../assets/blueParq.png";
import profile from "../assets/profile.png";
import topoBackground from "../assets/topoBackground.png";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginPopup from "./LoginPopup.jsx";
import AboutPage from "./About.jsx";
import Host from "./Host.jsx";
import { mapStyles } from "../assets/mapsStyles";


export default function MapDirections(state) { // add props back if state doesn't work 

  const [loggedIn, setLoggedIn] = useState(false);
  // check if there is a access_token in the session storage
  const access_token = window.sessionStorage.getItem("access_token");
  useEffect(() => {
    setLoggedIn(access_token ? true : false);
  }, []);

  const latitude = window.sessionStorage.getItem("originLatitude");
  const longitude = window.sessionStorage.getItem("originLongitude");

  console.log("THESE ARE THE COORDS FROM SESSIONS", longitude);
  console.log("THESE ARE THE COORDS FROM SESSIONS", latitude);

  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const originRef = useRef('Fresno, CA');
  const destinationRef = useRef(address ? address : location);

  // useEffect(() => {
  //   const setDirections = () => {
  //     setOrigin('37.422659,-122.089573');
  //     setDestination('One Amphitheatre Pkwy, Mountain View, CA 94043');
  //   }

  //   setDirections();
  // }, [])

  const address = state.location.state.address;
  const location = state.location.state.location;

  // console.log("this was passed from profile page => ", state);

  function directionsCallback (response) {
    console.log('directionsCallback response...', response)

    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.log('bad response... ', newResponse)
      }
    }
  }

  function checkDriving ({ target: { checked } }) {
    checked &&
      setTravelMode('DRIVING');
  }

  // removing these refs causes map to re-render infinitely
  function getOrigin (ref) {
    setOrigin(ref.current.value);
  }

  function getDestination (ref) {
    setDestination(ref.current.value);
  }

  function onClick () {
    if (origin.value !== '' && destination.value !== '') {
      setOrigin(originRef.current.value);
      setDestination(destinationRef.current.value);
    }
    // need current to access node, then value to access text
    console.log('Origin...', originRef.current.value)
    console.log('Destination...', destinationRef.current.value)
  }

  function onMapClick (...args) {
    console.log('onClick args: ', args)
  }

  // console.log(state.location.state.origin);

  function onLoad (map) {
    // HTML5 Geolocation API call, then pass that into getOrigin
    setOrigin(`${latitude},${longitude}`); // '37.422659,-122.089573'
    setDestination(address ? address : location);
    console.log('DirectionsRenderer onLoad map: ', map);
    // console.log('origin onLoad...', origin.value)
    // console.log('destination onLoad...', destination.value)

  }

  const options = {
    styles: mapStyles,
  };


  return (
    <div>
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
                <Link to="/profile">
                  <img className="profile" src={profile}></img>
                </Link>
              )}
            </Button>
          </Toolbar>
        </Box>
      </div>
      <div className='map'>
        <div className='map-settings'>
            <div id="directionsForm" className='form-group' style={{ height: "70px" }}>
              <label htmlFor='ORIGIN'>Origin - A</label>
              <input id='ORIGIN' className='form-control' type='text' ref={getOrigin} defaultValue={origin}/>
              <label htmlFor='DESTINATION'>Destination - B</label>
              <input id='DESTINATION' className='form-control' type='text' ref={getDestination} defaultValue={destination}/>
              <button className='btn btn-primary' type='button' onClick={onClick}>Build Route</button>
            </div>
      </div>

      <div className='map-container'>
        <GoogleMap
          // required
          id='direction-example'
          // required
          mapContainerStyle={{
            height: '100%',
            width: '100%'
          }}
          // required
          zoom={2}
          // required
          center={{
            lat: 0,
            lng: -180
          }}
          options={options}
          // optional
          onClick={onMapClick}
          // optional
          onLoad={onLoad}
          // optional
          onUnmount={map => {
            console.log('DirectionsRenderer onUnmount map: ', map)
          }}
        >
          {
            (
              destination !== '' &&
              origin !== ''
            ) && (
              <DirectionsService
                // required
                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  destination: destination,
                  origin: origin,
                  travelMode: travelMode,
                }}
                // required
                callback={directionsCallback}
                // optional
                onLoad={directionsService => {
                  console.log('DirectionsService onLoad directionsService: ', directionsService)
                }}
                // optional
                onUnmount={directionsService => {
                  console.log('DirectionsService onUnmount directionsService: ', directionsService)
                }}
              />
            )
          }

          {
            response !== null && (
              <DirectionsRenderer
                // required
                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                  directions: response
                }}
                // optional
                onLoad={directionsRenderer => {
                  console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                }}
                // optional
                onUnmount={directionsRenderer => {
                  console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                }}
              />
            )
          }
        </GoogleMap>
      </div>
    </div>
    </div>
  )
}