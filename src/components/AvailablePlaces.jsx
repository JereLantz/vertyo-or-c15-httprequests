import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3000/places")
            .then((resp)=>{
                return resp.json()
            })
            .then((respData)=>{
                setAvailablePlaces(respData.places)
            })
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
