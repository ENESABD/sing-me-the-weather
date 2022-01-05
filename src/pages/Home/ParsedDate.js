import React, { useEffect, useState } from 'react';

function ParsedDate({ weatherInfoForTheDay }) {

    const [fullDate, setFullDate] = useState('');
    const [forDateTime, setDateTime] = useState('');



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
            let year = newDate.getFullYear();
            let month = newDate.getMonth();
            setDateTime(year + '-' + (month+1) + '-' + day);
            month = numToMonth(month);
            setFullDate(month + ' ' + day + ', ' + year);
        } 
        
    }, [weatherInfoForTheDay])

    return (
        <time dateTime={forDateTime} className="chosen-date">
            {fullDate}
        </time>
    )
}

export default ParsedDate;
