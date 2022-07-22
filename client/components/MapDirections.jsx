import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
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


export default function MapDirections(state) {

  // check login status
  const [loggedIn, setLoggedIn] = useState(false);
  const access_token = window.sessionStorage.getItem("access_token");
  useEffect(() => {
    console.log('login useEffect happens...')
    setLoggedIn(access_token ? true : false);
  }, []);

  // declare constants to be used for generating directions onLoad
  const latitude = window.sessionStorage.getItem("originLatitude");
  const longitude = window.sessionStorage.getItem("originLongitude");
  const address = state.location.state.address;
  const location = state.location.state.location;


  const [origin, setOrigin] = useState(`${latitude},${longitude}`);
  const [destination, setDestination] = useState(address ? address : location);
  const [response, setResponse] = useState(null);
  const originRef = useRef('');
  const destinationRef = useRef('');

  useEffect(() => {
    console.log('generic useEffect happens...')
    console.log('generic useEffect origin...', origin)
    console.log('generic useEffect destination...'), destination
    console.log('generic useEffect response...', response)
    console.log('generic useEffect initOrigin...', originRef.current.value)
    console.log('generic useEffect initDestination...', destinationRef.current.value)

  })

  // causing issues with infinite re-render
  async function directionsCallback (response) {
    await console.log('directionsCallback response...', response)

    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.log('response: ', response)
      }
    }
  }

  function onClick () {
    console.log('onClick happens...')
    if (origin.value !== '' && destination.value !== '') {
      setOrigin(origin.value);
      setDestination(destination.value);
    }
    // console.log('origin input box... ', originRef.current.value)
    // console.log('destination input box... ', destinationRef.current.value)
    // setOrigin(originRef.current.value);
    // setDestination(destinationRef.current.value)
  }

  // function onMapClick (...args) {
  //   console.log('onClick args: ', args)
  // }

  function onLoad(map) {
    // latitude and longitude come from HTML Geolocation API, which was stored in session storage
    setOrigin(`${latitude},${longitude}`);
    // destination comes from either address or location in state passed in from redirect
    setDestination(address ? address : location);
    console.log('DirectionsRenderer onLoad map: ', map);
  }

  const getOrigin = ref => {
    if (ref) {
      console.log('getOrigin happens...', ref)
      setOrigin(ref);
    } else console.log('no ref Origin')
  };

  const getDestination = ref => {
    if (ref) {
      console.log('getDestination happens...', ref)
      setDestination(ref);
    } else console.log('no ref Destination')
  };

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
          // onClick={onMapClick}
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
                  travelMode: 'DRIVING',
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