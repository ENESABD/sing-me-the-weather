import React, { useEffect, useState } from 'react';

function ParsedDate({ weatherInfoForTheDay }) {

    const [fullDate, setFullDate] = useState('');



    useEffect(() => {
        const numToMonth = (month) => {
            switch (month) {
                case 0:
                    return 'January';
                case 1:
                    return 'February';
                case 2:
                    return 'March';
                case 3:
                    return 'April';
                case 4:
                    return 'May';
                case 5:
                    return 'June';
                case 6:
                    return 'July';
                case 7:
                    return 'August';
                case 8:
                    return 'September';
                case 9:
                    return 'October';
                case 10:
                    return 'November';
                case 11:
                    return 'December';
            
                default:
                    return '' //shouldn't happen

            }
        }
        if (weatherInfoForTheDay.dt) {
            let newDate = new Date(weatherInfoForTheDay.dt * 1000);
            let day = newDate.getDate();
            let month = newDate.getMonth();
            month = numToMonth(month);
            let year = newDate.getFullYear();
            console.log(month, day);
            setFullDate(month + ' ' + day + ', ' + year);
        } 
        
    }, [weatherInfoForTheDay])

    return (
        <div>
            {fullDate}
        </div>
    )
}

export default ParsedDate;
