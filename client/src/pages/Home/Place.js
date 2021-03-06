import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Place({ lat, lon, setPhotoUrl }) {

    const [city, setCity] = useState('');
    const [countryState, setCountryState] = useState('');
    const [country, setCountry] = useState('');


    useEffect(()=> {

        const getAdressInfo = async () => {
            await axios.get(`https://sing-me-the-weather.herokuapp.com/place/?lat=${lat}&lon=${lon}`)
                .then(res => {
                    setCity(res.data.city);
                    setCountry(res.data.country);
                    setCountryState(res.data.countryState);
                    setPhotoUrl("https://sing-me-the-weather.herokuapp.com/image.jpg");
                })
                .catch(err => console.log(err))  
        }
        
        getAdressInfo()
        
    },[lat, lon, setPhotoUrl])
    
    
    return (
        <>
            <h2 className="city">{city},</h2>
            <h1 className="country-or-state">{countryState === '' ? country : countryState}</h1>
        </>
    )
}

export default Place;
