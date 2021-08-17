import React from 'react';

function OtherWeatherInfo({ weatherInfoForTheDay }) {


    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Min</td>
                        <td>{weatherInfoForTheDay.temp.min}</td>
                    </tr>
                    <tr>
                        <td>Max</td>
                        <td>{weatherInfoForTheDay.temp.max}</td>
                    </tr>
                    <tr>
                        <td>Morn</td>
                        <td>{weatherInfoForTheDay.temp.morn}</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>{weatherInfoForTheDay.temp.eve}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OtherWeatherInfo;
