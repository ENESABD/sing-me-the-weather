import React, { useEffect, useState, useCallback } from 'react';
import Icon from './Icon';

function MainWeather({ allWeatherInfo, day, setForCategory, itIsUnit, unit, weatherInfoForTheDay, setWeatherInfoForTheDay}) {

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
                        setTemp(allWeatherInfo.current.temp);
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
                    setTemp(allWeatherInfo.daily[day].temp.day);
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
        console.log(allWeatherInfo);
    },[day, setForCategory, allWeatherInfo, itIsUnit, isAlreadyCurrent, setWeatherInfoForTheDay])


    if (isLoading) {
        <div>Loading...</div>
    }

    return (
        <div>
            <div>{temp}</div>
            <div>{weatherDescription}</div>
            <Icon iconCode={iconCode} />
        </div>
    )
}

export default MainWeather;
