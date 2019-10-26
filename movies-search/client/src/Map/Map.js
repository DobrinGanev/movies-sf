import React, {useEffect, useRef, useContext} from 'react'
import mapboxgl from 'mapbox-gl'
import {SearchContext} from '../SearchProvider'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
// I need the BBOX of San Francisco or my search will be in the entire world
const SEARCH_BBOX = process.env.REACT_APP_SEARCH_BBOX

const Map = () => {
  const mapRef = useRef(null)
  const mapContainer = useRef(null)
  const {selectedPlace} = useContext(SearchContext)

  useEffect(() => {
    const controller = new AbortController()
    const fetchPlace = async selectedPlace => {
      const encoded = encodeURI(selectedPlace)
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?bbox=${SEARCH_BBOX}&access_token=${mapboxgl.accessToken}`
      try {
        const res = await fetch(url, {
          signal: controller.signal,
        })
        const response = await res.json()
        if (response && response.features) {
          const center = response.features[0].center // here I am grabbing the first one.
          // the reason is that I am sorting my results in MongoDB by search score.
          // probably can be done better by displaying all of the on the map? it's an UX thing
          new mapboxgl.Marker().setLngLat(center).addTo(mapRef.current)

          new mapboxgl.Popup()
            .setLngLat(center)
            .setHTML(selectedPlace)
            .addTo(mapRef.current)
        }
      } catch {
        // I don't think it's needed! but cancel it anyway. log the error in the service(bugsnag whatever..)
        controller.abort()
      }
    }
    if (selectedPlace) {
      fetchPlace(selectedPlace)
    }
    return () => {
      // when the component is unmounted, cancel the request that is in progress
      controller.abort()
    }
  }, [selectedPlace])

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-preview-night-v2',
      center: [-122.431297, 37.773972],
      zoom: 12,
    })

    return () => {
      // the component is unmounted. get rid of the map
      mapRef.current.remove()
    }
  }, [])

  return (
    <div
      style={{
        height: '1000px',
      }}
      ref={mapContainer}
    />
  )
}

export default Map
