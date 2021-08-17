import React, { useEffect, useState } from 'react';
import Icon from './Icon';

function NextHours({ hoursWeather }) {

    const [hour, setHour] = useState('');

    
    const convertToTwelveHour = (hour) => {
        let suffix = (hour >= 12) ? "pm":"am";
        hour = ((hour + 11) % 12 + 1);
        return hour + suffix;
    }


    useEffect(() => {
        let newDate = new Date();
        setHour(newDate.getHours());
    },[])





    return (
        <div>
            {hoursWeather[0] ? 
            <table>
                <tbody>
                    <tr>
                        <td>{convertToTwelveHour(hour)}</td>
                        <td><Icon iconCode={hoursWeather[0].weather[0].icon} /></td>
                        <td>{hoursWeather[0].temp}</td>
                    </tr>
                    <tr>
                        <td>{convertToTwelveHour(hour + 2)}</td>
                        <td><Icon iconCode={hoursWeather[2].weather[0].icon} /></td>
                        <td>{hoursWeather[2].temp}</td>
                    </tr>
                    <tr>
                        <td>{convertToTwelveHour(hour + 4)}</td>
                        <td><Icon iconCode={hoursWeather[4].weather[0].icon} /></td>
                        <td>{hoursWeather[4].temp}</td>
                    </tr>
                    <tr>
                        <td>{convertToTwelveHour(hour + 6)}</td>
                        <td><Icon iconCode={hoursWeather[6].weather[0].icon} /></td>
                        <td>{hoursWeather[6].temp}</td>
                    </tr>
                </tbody>
            </table>
            : null }
        </div>
    )
}

export default NextHours;
