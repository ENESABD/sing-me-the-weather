import React, { useEffect, useState } from 'react';
import Geocode from "react-geocode";


function Place({ lat, lon, setPlaceId }) {

    const [city, setCity] = useState('');
    const [countryState, setCountryState] = useState('');
    const [country, setCountry] = useState('');


    useEffect(()=> {

        const myGoogleApiKey = "AIzaSyCAQoJ1jsE-tYAC-sZ4_O_xwaLBC4JQy94";

        if (lat && lon) {
            Geocode.setApiKey(myGoogleApiKey);
            Geocode.setLocationType("ROOFTOP");
            Geocode.enableDebug();
            Geocode.fromLatLng(lat, lon)
                .then(
                    res => {
                        let address1 = res.results[0].formatted_address;
                        console.log(address1);
                        console.log(res.results[0]);


                        console.log('geocode call made');
                
                    
                        for (let i = 0; i < res.results[0].address_components.length; i++) {
                            for (let j = 0; j < res.results[0].address_components[i].types.length; j++) {
                                switch (res.results[0].address_components[i].types[j]) {
                                case "locality":
                                    setCity(res.results[0].address_components[i].long_name);
                                    break;
                                case "administrative_area_level_1":
                                    setCountryState(res.results[0].address_components[i].long_name);
                                    break;
                                case "country":
                                    setCountry(res.results[0].address_components[i].long_name);
                                    break;
                                default:
                                    console.log('there is a problem with geocoding');
                                }
                                
                            }
                        }
                    },
                    err => {
                        console.error(err);
                    }
                );
        }     
        

    },[lat, lon])

    useEffect(() => {

        if(city) {
            if (countryState) {
                Geocode.fromAddress(city + ', ' + countryState)
                    .then(
                        res => {
                            console.log('geocode call made');
                            setPlaceId(res.results[0].place_id);
                        },
                        err => {
                            console.log(err);
                        }
                    );                
            } else if (country) {
                Geocode.fromAddress(city + ', ' + country)
                    .then(
                        res => {
                            setPlaceId(res.results[0].place_id);
                        },
                        err => {
                            console.log(err);
                        }
                    );
            }
        }
        

    }, [city, countryState, country, setPlaceId])
    
    return (
        <>
            <h2 className="city">{city},</h2>
            <h1 className="country-or-state">{countryState === '' ? country : countryState}</h1>
        </>
    )
}

export default Place;
