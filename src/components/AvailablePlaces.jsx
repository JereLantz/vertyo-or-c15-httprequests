import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';
import Error from "./Error"
import { sortPlacesByDistance } from '../loc.js';
import {fetchAvailablePlaces} from "../http.js"

export default function AvailablePlaces({ onSelectPlace }) {
    const [isFetching, setIsFetching] = useState(false)
    const [availablePlaces, setAvailablePlaces] = useState([])
    const [error, setError] = useState()

    useEffect(()=>{
        /*
        fetch("http://localhost:3000/places")
            .then((resp)=>{
                return resp.json()
            })
            .then((respData)=>{
                setAvailablePlaces(respData.places)
            })
            */
        async function fetchPlaces(){
            setIsFetching(true)
            try{
                const places = await fetchAvailablePlaces()

                navigator.geolocation.getCurrentPosition((position)=>{
                    const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
                    setAvailablePlaces(sortedPlaces)
                    setIsFetching(false)
                })
            }
            catch(error){
                setError({message:error.message || "Could not fetch places, please try again later"})
                setIsFetching(false)
            }
        }
        fetchPlaces()
    },[])

    if(error){
        return <Error title="An error occurred!" message={error.message}/>
    }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
