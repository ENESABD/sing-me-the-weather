import React, { useEffect, useState} from 'react';
import axios from 'axios';
import MainWeather from './MainWeather';
import Place from './Place';
import ParsedDate from './ParsedDate';
import NextHours from './NextHours';
import OtherWeatherInfo from './OtherWeatherInfo';

function Weather({ setForCategory, unit, day, itIsUnit, setPlaceId }) {


    const [weatherInfoForTheDay, setWeatherInfoForTheDay] = useState({});

    
    const [allWeatherInfo, setAllWeatherInfo] = useState(null);
    

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const [hoursWeather, setHoursWeather] = useState({});



    const myApiKey = 'df06240ee5aea040d1e13720eac10a90';


    useEffect(() => {
        const getAllWeatherInfo = async () => {            
            await navigator.geolocation.getCurrentPosition(async (position) => {
                let lat1 = position.coords.latitude;
                let lon1 = position.coords.longitude;

                setLat(lat1);
                setLon(lon1);

                await axios.get //instead of using the api's unit parameter, conversion functions can be used to save api calls
                (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat1}&lon=${lon1}&units=${unit}&exclude=minutely&appid=${myApiKey}`)
                    .then(res => {
                        setAllWeatherInfo(res.data);
                        setHoursWeather(res.data.hourly);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })            
        }
        getAllWeatherInfo();

    },[unit])

    
    
    

    return (
        <div>          
            <MainWeather allWeatherInfo={allWeatherInfo} day={day} setForCategory={setForCategory} itIsUnit={itIsUnit} 
                weatherInfoForTheDay={weatherInfoForTheDay} setWeatherInfoForTheDay={setWeatherInfoForTheDay} />
            {day === '0' ? 
            <NextHours hoursWeather={hoursWeather} /> :
            <OtherWeatherInfo weatherInfoForTheDay={weatherInfoForTheDay} />}
            <ParsedDate weatherInfoForTheDay={weatherInfoForTheDay} />
            <Place lat={lat} lon={lon} setPlaceId={setPlaceId}/>
        </div>
    )
}

export default Weather;
