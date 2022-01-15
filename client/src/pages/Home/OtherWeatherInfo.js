import React from 'react';

function OtherWeatherInfo({ weatherInfoForTheDay, unitSign }) {


    return (
        <>
            {weatherInfoForTheDay.temp ?
            <table className="other-info-table">
                <tbody className="other-info-table-body">
                    <tr className="other-info-table-row">
                        <td className="other-info-type">Min</td>
                        <td className="other-info-temp">{Math.round(weatherInfoForTheDay.temp.min)}{unitSign}</td>
                    </tr>
                    <tr className="other-info-table-row">
                        <td className="other-info-type">Max</td>
                        <td className="other-info-temp">{Math.round(weatherInfoForTheDay.temp.max)}{unitSign}</td>
                    </tr>
                    <tr className="other-info-table-row">
                        <td className="other-info-type">Morn</td>
                        <td className="other-info-temp">{Math.round(weatherInfoForTheDay.temp.morn)}{unitSign}</td>
                    </tr>
                    <tr className="other-info-table-row">
                        <td className="other-info-type">Eve</td>
                        <td className="other-info-temp">{Math.round(weatherInfoForTheDay.temp.eve)}{unitSign}</td>
                    </tr>
                </tbody>
            </table>
            : null}
        </>
    )
}

export default OtherWeatherInfo;
