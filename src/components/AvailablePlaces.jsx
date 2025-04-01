import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
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
            const response = await fetch("http://localhost:3000/places")
            const respData = await response.json()
            setAvailablePlaces(respData.places)
        }
        fetchPlaces()
    },[])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
