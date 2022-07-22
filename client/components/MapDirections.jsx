import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

export default function MapDirections(props) {

  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const originRef = useRef('Fresno, CA');
  const destinationRef = useRef('Irvine, CA');

  // current problem is that response is causing infinite re-render
  function directionsCallback (newResponse) {
    console.log('directionsCallback response...', newResponse)
    console.log('old response...', response)

    if (/*newResponse !== null &&*/ newResponse !== response) {
      if (newResponse.status === 'OK') {
        setResponse(newResponse);
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
  // function getOrigin (ref) {
  //   setOrigin(ref.current.value);
  // }

  // function getDestination (ref) {
  //   setDestination(ref.current.value);
  // }

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

  function onLoad (map) {
    // HTML5 Geolocation API call, then pass that into getOrigin

    // setOrigin and setDestination will actually render the directions in the map
    setOrigin(originRef.current.value);
    setDestination(destinationRef.current.value);

    console.log('DirectionsRenderer onLoad map: ', map);
    // console.log('origin onLoad...', origin.value)
    // console.log('destination onLoad...', destination.value)

  }

  return (
    <div className='map'>
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />

        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='ORIGIN'>Origin - A</label>
              <br />                                                  {/* removing this ref makes map re-render infinitely */}
              <input id='ORIGIN' className='form-control' type='text'  ref={originRef}  defaultValue={originRef.current} />
            </div>
          </div>

          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='DESTINATION'>Destination - B</label>
              <br />                                                        {/* removing this ref makes map re-render infinitely */}
              <input id='DESTINATION' className='form-control' type='text'   ref={destinationRef}  defaultValue={destinationRef.current} />
            </div>
          </div>
        </div>

        <button className='btn btn-primary' type='button' onClick={onClick}>
          Build Route
        </button>
      </div>

      <div className='map-container'>
        <GoogleMap
          // required
          id='direction-example'
          // required
          mapContainerStyle={{
            height: '100vh',
            width: '100%'
          }}
          // required
          zoom={2}
          // required
          center={{
            lat: 0,
            lng: -180
          }}
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
                  travelMode: travelMode
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
  )
}