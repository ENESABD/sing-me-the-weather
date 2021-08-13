import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Weather({ setForCategory, unit, day, itIsUnit }) {



    const [isLoading, setLoading] = useState(true);

    const [allWeatherInfo, setAllWeatherInfo] = useState(null);
    const [weatherInfoForTheDay, setWeatherInfoForTheDay] = useState(null);

    const myApiKey = 'df06240ee5aea040d1e13720eac10a90';

    useEffect(() => {
        const getAllWeatherInfo = async () => {            
            await navigator.geolocation.getCurrentPosition(async (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                

                await axios.get //instead of using the api's unit parameter, conversion functions can be used to save api calls
                (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=minutely&appid=${myApiKey}`)
                    .then(res => {
                        setAllWeatherInfo(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })

                    
        }
        getAllWeatherInfo();

    },[unit])

    

    

    useEffect(() => {
        const getWeatherInfo = async () => {
            if (allWeatherInfo) {
                if (day === '0') {
                    setWeatherInfoForTheDay(allWeatherInfo.current);
                    if (!(itIsUnit)) {
                        setForCategory({
                            main: allWeatherInfo.current.weather[0].main, 
                            sunset: allWeatherInfo.current.sunset, 
                            sunrise: allWeatherInfo.current.sunrise,
                            today: true
                        });
                    } 

                    
                  
                    setLoading(false);
                } else {
                    setWeatherInfoForTheDay(allWeatherInfo.daily[day]);
                    if (!(itIsUnit)) {
                        setForCategory({
                            main: allWeatherInfo.daily[day].weather[0].main, 
                            sunset: allWeatherInfo.current.sunset, 
                            sunrise: allWeatherInfo.current.sunrise,
                            today: true
                        });
                    }
                    
                    setLoading(false);
                }                   
            }
            
        }
        getWeatherInfo();
    },[day, setForCategory, allWeatherInfo, itIsUnit])


    if (isLoading) {
        <div>Loading...</div>
    }

    return (
        <div>          
            {weatherInfoForTheDay ? <p>{weatherInfoForTheDay.weather[0].description}</p> : null}
        </div>
    )
}

export default Weather;
