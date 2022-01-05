import React, { useEffect, useState } from 'react';
import Icon from './Icon';

function NextHours({ hoursWeather, unitSign }) {

    const [hour, setHour] = useState('');

    
    const convertToTwelveHour = (hour) => {
        let suffix = (hour >= 12 & hour < 24) ? "pm":"am";
        hour = ((hour + 11) % 12 + 1);
        return hour + suffix;
    }


    useEffect(() => {
        let newDate = new Date();
        setHour(newDate.getHours());
    },[])





    return (
        <>
            {hoursWeather[0] ? 
            <table className="hourly-info-table">
                <tbody className="hourly-info-table-body">
                    <tr className="hourly-info-table-row">
                        <td className="weather-hour">{convertToTwelveHour(hour)}</td>
                        <td className="weather-hour-icon"><Icon iconCode={hoursWeather[0].weather[0].icon} /></td>
                        <td className="weather-hour-temp">{Math.round(hoursWeather[0].temp)}{unitSign}</td>
                    </tr>
                    <tr className="hourly-info-table-row">
                        <td className="weather-hour">{convertToTwelveHour(hour + 2)}</td>
                        <td className="weather-hour-icon"><Icon iconCode={hoursWeather[2].weather[0].icon} /></td>
                        <td className="weather-hour-temp">{Math.round(hoursWeather[2].temp)}{unitSign}</td>
                    </tr>
                    <tr className="hourly-info-table-row">
                        <td className="weather-hour">{convertToTwelveHour(hour + 4)}</td>
                        <td className="weather-hour-icon"><Icon iconCode={hoursWeather[4].weather[0].icon} /></td>
                        <td className="weather-hour-temp">{Math.round(hoursWeather[4].temp)}{unitSign}</td>
                    </tr>
                    <tr className="hourly-info-table-row">
                        <td className="weather-hour">{convertToTwelveHour(hour + 6)}</td>
                        <td className="weather-hour-icon"><Icon iconCode={hoursWeather[6].weather[0].icon} /></td>
                        <td className="weather-hour-temp">{Math.round(hoursWeather[6].temp)}{unitSign}</td>
                    </tr>
                </tbody>
            </table>
            : null }
        </>
    )
}

export default NextHours;
