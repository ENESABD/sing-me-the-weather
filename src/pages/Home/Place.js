import React, { useEffect, useState } from 'react';
import Geocode from "react-geocode";


function Place({ lat, lon }) {

    const [city, setCity] = useState('');
    const [countryState, setCountryState] = useState('');
    const [country, setCountry] = useState('');


    useEffect(()=> {
        if (lat, lon) {
            Geocode.setApiKey("AIzaSyCAQoJ1jsE-tYAC-sZ4_O_xwaLBC4JQy94");
            Geocode.setLocationType("ROOFTOP");
            Geocode.enableDebug();
            Geocode.fromLatLng(lat, lon).then(
                res => {
                    let address1 = res.results[0].formatted_address;
                    console.log(address1);
                    console.log(res.results[0]);


                
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
    
    return (
        <div>
            <div>{city},</div>
            <div>{countryState === '' ? country : countryState}</div>
        </div>
    )
}

export default Place;
