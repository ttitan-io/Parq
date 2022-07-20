import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

export default function MapDirections(props) {

  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  // useEffect(() => {
  //   const setDirections = () => {
  //     setOrigin('37.422659,-122.089573');
  //     setDestination('One Amphitheatre Pkwy, Mountain View, CA 94043');
  //   }

  //   setDirections();
  // }, [])

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

  function onLoad (map) {
    // HTML5 Geolocation API call, then pass that into getOrigin
    setOrigin('37.422659,-122.089573')
    setDestination('One Amphitheatre Pkwy, Mountain View, CA 94043')
    console.log('DirectionsRenderer onLoad map: ', map)
    console.log('origin...', origin)
    console.log('destination...', destination)

  }

  return (
    <div className='map'>
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />

        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='ORIGIN'>Origin - A</label>
              <br />
              <input id='ORIGIN' className='form-control' type='text' ref={getOrigin} defaultValue={origin}/>
            </div>
          </div>

          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <label htmlFor='DESTINATION'>Destination - B</label>
              <br />
              <input id='DESTINATION' className='form-control' type='text' ref={getDestination} defaultValue={destination}/>
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