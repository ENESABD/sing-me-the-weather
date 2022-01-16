import React, { useEffect, useState, useCallback } from 'react';
import Icon from './Icon';

function MainWeather({ allWeatherInfo, day, setForCategory, itIsUnit, unitSign, weatherInfoForTheDay, setWeatherInfoForTheDay}) {

    const [isLoading, setLoading] = useState(true);
    const [temp, setTemp] = useState('');
    const [weatherDescription, setWeatherDescription] = useState('');
    const [iconCode, setIconCode] = useState('');

    const isAlreadyCurrent = useCallback(() => { 
        return weatherInfoForTheDay === allWeatherInfo.current;
      }, [allWeatherInfo, weatherInfoForTheDay]);
    

    useEffect(() => {
        const getWeatherInfoForTheDay = async () => {
            if (allWeatherInfo) {
                if (day === '0') {
                    if (!(isAlreadyCurrent())) {
                        setWeatherInfoForTheDay(allWeatherInfo.current);
                        setTemp(Math.round(allWeatherInfo.current.temp));
                        setWeatherDescription(allWeatherInfo.current.weather[0].description.toLowerCase()
                            .split(' ')
                            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                            .join(' ')
                        );
                        setIconCode(allWeatherInfo.current.weather[0].icon);
                        if (!(itIsUnit)) { //use ref for simpler code
                            setForCategory({
                                main: allWeatherInfo.current.weather[0].main, 
                                dayOrNight: allWeatherInfo.current.weather[0].icon[2]
                            });
                        } 
                    }                 
                    setLoading(false);
                } else {
                    setWeatherInfoForTheDay(allWeatherInfo.daily[day]);
                    setTemp(Math.round(allWeatherInfo.daily[day].temp.day));
                    setWeatherDescription(allWeatherInfo.daily[day].weather[0].description.toLowerCase()
                        .split(' ')
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')
                    );
                    setIconCode(allWeatherInfo.daily[day].weather[0].icon);
                    if (!(itIsUnit)) {
                        setForCategory({
                            main: allWeatherInfo.daily[day].weather[0].main,
                            dayOrNight: allWeatherInfo.daily[day].weather[0].icon[2]
                        });
                    }                    
                    setLoading(false);
                }                   
            }
            
        }
        getWeatherInfoForTheDay();
    },[day, setForCategory, allWeatherInfo, itIsUnit, isAlreadyCurrent, setWeatherInfoForTheDay])


    if (isLoading) {
        <>
            {/*<label htmlFor="main-weather-loading">Loading...</label>*/}
            <progress /*id="main-weather-loading"*/ className="main-weather-loading"></progress>
        </>
    }

    return (
        <dl className="main-weather-info">
            <dt className="main-temperature">{temp}{unitSign}</dt>
            <dd className="main-weather-icon"><Icon iconCode={iconCode}/></dd>
            <dd className="main-weather-description">{weatherDescription}</dd>
        </dl>
    )
}

export default MainWeather;
