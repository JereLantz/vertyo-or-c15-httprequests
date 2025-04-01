import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
    const [isFetching, setIsFetching] = useState(false)
    const [availablePlaces, setAvailablePlaces] = useState([])

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
            const response = await fetch("http://localhost:3000/places")
            const respData = await response.json()
            setAvailablePlaces(respData.places)
            setIsFetching(false)
        }
        fetchPlaces()
    },[])

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
