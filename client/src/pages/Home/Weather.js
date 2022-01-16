import React, { useEffect, useState} from 'react';
import axios from 'axios';
import MainWeather from './MainWeather';
import Place from './Place';
import ParsedDate from './ParsedDate';
import NextHours from './NextHours';
import OtherWeatherInfo from './OtherWeatherInfo';

function Weather({ setForCategory, unit, day, itIsUnit, setPhotoUrl }) {


    const [weatherInfoForTheDay, setWeatherInfoForTheDay] = useState({});

    
    const [allWeatherInfo, setAllWeatherInfo] = useState(null);
    

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const [hoursWeather, setHoursWeather] = useState({});

    const [unitSign, setUnitSign] = useState('');



    useEffect(() => {
        const getAllWeatherInfo = async () => {                     
            await navigator.geolocation.getCurrentPosition(async (position) => {
                let lat1 = position.coords.latitude;
                let lon1 = position.coords.longitude;

                setLat(lat1);
                setLon(lon1);

                //instead of using the api's unit parameter, conversion functions can be used to save api calls
                await axios.get(`https://sing-me-the-weather.herokuapp.com/weather/?lat=${lat1}&lon=${lon1}&units=${unit}`)
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
        
        if (unit === "standard") {
            setUnitSign(' K');
        } else if (unit === "metric") {
            setUnitSign('°C');
        } else if (unit === "imperial") {
            setUnitSign('°F');
        }

    },[unit])

    
    
    

    return (
        <section className="weather-section">
            <MainWeather allWeatherInfo={allWeatherInfo} day={day} setForCategory={setForCategory} itIsUnit={itIsUnit} 
                weatherInfoForTheDay={weatherInfoForTheDay} setWeatherInfoForTheDay={setWeatherInfoForTheDay} 
                unitSign={unitSign} />
            {day === '0' ? 
            <NextHours hoursWeather={hoursWeather} unitSign={unitSign} /> :
            <OtherWeatherInfo weatherInfoForTheDay={weatherInfoForTheDay} unitSign={unitSign} />}

            <header className="user-location-and-chosen-date">
                <ParsedDate weatherInfoForTheDay={weatherInfoForTheDay} />
                <Place lat={lat} lon={lon} setPhotoUrl={setPhotoUrl} />
            </header>          
        </section>
    )
}

export default Weather;
