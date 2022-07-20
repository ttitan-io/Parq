/*import React from 'react'
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyADsm4pETi_2Ja_1LHGQae6MGBY2SU1UOk"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ //}
        // <></>
    //   </GoogleMap>
    // </LoadScript>
//   )
// }

// const { Component } = require('react');
// const { GoogleMap, LoadScript, DirectionsService } = require("../../");
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;

import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

export default function MapDirections(props) {

    const [response, setResponse] = useState(null);
    const [travelMode, setTravelMode] = useState('DRIVING');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    // this.directionsCallback = this.directionsCallback.bind(this)
    // this.checkDriving = this.checkDriving.bind(this)
    // this.getOrigin = this.getOrigin.bind(this)
    // this.getDestination = this.getDestination.bind(this)
    // this.onClick = this.onClick.bind(this)
    // this.onMapClick = this.onMapClick.bind(this)

  function directionsCallback (response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.log('response: ', response)
      }
    }
  }

  function checkDriving ({ target: { checked } }) {
    checked &&
      setTravelMode('DRIVING');
  }

  function getOrigin (ref) {
    setOrigin(ref);
  }

  function getDestination (ref) {
    setDestination(ref);
  }

  function onClick () {
    if (origin.value !== '' && destination.value !== '') {
      setOrigin(origin.value);
      setDestination(destination.value);
    }
  }

  function onMapClick (...args) {
    console.log('onClick args: ', args)
  }

  return (
    <div className='map'>
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />

        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='ORIGIN'>Origin</label>
              <br />
              <input id='ORIGIN' className='form-control' type='text' ref={getOrigin} />
            </div>
          </div>

          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='DESTINATION'>Destination</label>
              <br />
              <input id='DESTINATION' className='form-control' type='text' ref={getDestination} />
            </div>
          </div>
        </div>

        {/* <div className='d-flex flex-wrap'>
          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='DRIVING'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={travelMode === 'DRIVING'}
              onChange={checkDriving}
            />
            <label className='custom-control-label' htmlFor='DRIVING'>Driving</label>
          </div>

          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='BICYCLING'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={this.state.travelMode === 'BICYCLING'}
              onChange={this.checkBicycling}
            />
            <label className='custom-control-label' htmlFor='BICYCLING'>Bicycling</label>
          </div>

          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='TRANSIT'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={this.state.travelMode === 'TRANSIT'}
              onChange={this.checkTransit}
            />
            <label className='custom-control-label' htmlFor='TRANSIT'>Transit</label>
          </div>

          <div className='form-group custom-control custom-radio mr-4'>
            <input
              id='WALKING'
              className='custom-control-input'
              name='travelMode'
              type='radio'
              checked={this.state.travelMode === 'WALKING'}
              onChange={this.checkWalking}
            />
            <label className='custom-control-label' htmlFor='WALKING'>Walking</label>
          </div>
        </div> */}

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
            height: '400px',
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
          onLoad={map => {
            console.log('DirectionsRenderer onLoad map: ', map)
          }}
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

{/* <ScriptLoaded>
  <Directions />
</ScriptLoaded> */}

// export default React.memo(MyComponent)