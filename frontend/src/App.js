import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { logEntry } from './Routes';
import PopupForm from './PopupForm'


const MAPBOX_TOKEN = 'pk.eyJ1IjoiaXFzeW1waGljIiwiYSI6ImNrZ2JqbTIxaTAwOGIyc3FveDF5cHZmamcifQ.SBWjlYgl1IOrOTniMH1wBw'

function App() {

  const [logEntries, setLogEntries] = useState([])
  const [showPopup, setShowPopUp] = useState({})
  const [addEntryLocation, setAddEntryLocation] = useState(null)

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  const getEntries = async () => {
    const logEntries = await logEntry()
    setLogEntries(logEntries)
  }

  useEffect(() => {
    getEntries()
  }, [])

  const addMarkerPopUp = (event) => {
    console.log(event) 

    const [ longitude, latitude ] = event.lngLat
    setAddEntryLocation({ latitude, longitude })
    
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/iqsymphic/ckgcbssux4pwu19qtnlsiahqy" // change this with your own!
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={addMarkerPopUp}
    > 
    
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              latitude={entry.latitude} 
              longitude={entry.longitude}
            >

              <div
                onClick={() => setShowPopUp({
                  [entry._id]: true
                })} //feel free to toggle
              >
                <svg className="svg-marker"
                  style={{ width: `${6 * viewport.zoom}px`, height: `${6 * viewport.zoom}px` }} 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  fill="none" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>     
              {
                showPopup[entry._id] ? (
                  <Popup
                    latitude={entry.latitude} 
                    longitude={entry.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    dynamicPosition={true}
                    onClose={() => setShowPopUp({})}
                    anchor="top" >
                    <div className="popup">
                      <h3>{entry.title}</h3>
                      <p>{entry.comments}</p>
                      <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    </div>
                  </Popup>
                ) : null

              }
            </React.Fragment>
        ))
      }
      {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude}
            >
              <div>
                <svg className="new-marker"
                  style={{ width: `${6 * viewport.zoom}px`, height: `${6 * viewport.zoom}px` }} 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  fill="none" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker> 

            <Popup
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div className="popup">
                <PopupForm 
                  currentLocation={addEntryLocation}
                  onClose={() => {
                    setAddEntryLocation(null)
                    getEntries()
                  }} 
                />
              </div>
            </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}

export default App