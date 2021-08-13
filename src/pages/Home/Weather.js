import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Weather({ setForCategory, unit, day }) {

    const previousUnit = useRef(unit);


    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null); 
    const [isLoading, setLoading] = useState(true);

    const [weatherInfo, setWeatherInfo] = useState(null);

    const myApiKey = 'df06240ee5aea040d1e13720eac10a90';

    useEffect(() => {
        const updateUserLocation = async () => {
            await navigator.geolocation.getCurrentPosition((position) => {
              setLat(position.coords.latitude);
              setLon(position.coords.longitude);
            }); 
          }
      
        updateUserLocation();

    },[])

    

    

    useEffect(() => {
        const getWeatherInfo = async () => {
            
            if (lat && lon) {
                await axios.get
            (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=minutely&appid=${myApiKey}`)
                .then(res => {
                    if (day === '0') {
                        setWeatherInfo(res.data.current);
                        if (previousUnit.current === unit) {
                            setForCategory({
                                main: res.data.current.weather[0].main, 
                                sunset: res.data.current.sunset, 
                                sunrise: res.data.current.sunrise,
                                today: true
                            });
                        } else {
                            previousUnit.current = unit;
                        }
                        setLoading(false);
                    } else {
                        setWeatherInfo(res.data.daily[day]);
                        if (previousUnit.current === unit) {
                            setForCategory({
                                main: res.data.daily[day].weather[0].main, 
                                sunset: res.data.current.sunset, 
                                sunrise: res.data.current.sunrise,
                                today: false
                            });
                        } else {
                            previousUnit.current = unit;
                        }
                        setLoading(false);
                    }
                    
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
            }            
        }
        getWeatherInfo();
    },[lat, lon, day, unit, setForCategory])


    if (isLoading) {
        <div>Loading...</div>
    }

    return (
        <div>          
            {weatherInfo ? <p>{weatherInfo.weather[0].description}</p> : null}
        </div>
    )
}

export default Weather;
