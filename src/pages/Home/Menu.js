import React, { useEffect, useState } from 'react';

function Menu( { setUnit, setDay }) {
    
    const [currentDay, setCurrentDay] = useState(null);


    
    const getCurrentDay = () => {
        let newDate = new Date();
        let day = newDate.getDay();
        return day;
    }

    useEffect(() => {
        setCurrentDay(getCurrentDay());
    },[])


    const numToWeekday = (num) => {
        num = num % 7;
        switch (num) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            default: //shouldn't happen
                return 'Not Available' 
        }
    }

    const onChangeDay = (e) => {
        setDay(e.target.value);
    }

    const onChangeUnit = (e) =>{
        setUnit(e.target.value);
    }

    return (
        <div>
            <div onChange={onChangeDay}>
                <input type="radio" value={0} name="day" /> Today
                <input type="radio" value={1} name="day" /> {numToWeekday(currentDay + 1)}
                <input type="radio" value={2} name="day" /> {numToWeekday(currentDay + 2)}
                <input type="radio" value={3} name="day" /> {numToWeekday(currentDay + 3)}
                <input type="radio" value={4} name="day" /> {numToWeekday(currentDay + 4)}
                <input type="radio" value={5} name="day" /> {numToWeekday(currentDay + 5)}
                <input type="radio" value={6} name="day" /> {numToWeekday(currentDay + 6)}
                <input type="radio" value={7} name="day" /> {numToWeekday(currentDay + 7)}
            </div>


            <div onChange={onChangeUnit}>
                <input type="radio" value="imperial" name="unit" /> Fahrenheit
                <input type="radio" value="metric" name="unit" /> Celcius
                <input type="radio" value="standard" name="unit" /> Kelvin
            </div>
        </div>
    )
}

export default Menu;
