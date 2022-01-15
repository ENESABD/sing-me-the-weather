import React, { useEffect, useState } from 'react';

function Menu( { setUnit, setDay, setItIsUnit }) {
    
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
                return 'Sun';
            case 1:
                return 'Mon';
            case 2:
                return 'Tue';
            case 3:
                return 'Wed';
            case 4:
                return 'Thu';
            case 5:
                return 'Fri';
            case 6:
                return 'Sat';
            default: //shouldn't happen
                return 'Not Available' 
        }
    }

    const onChangeDay = (e) => {
        setItIsUnit(false);
        setDay(e.target.value);
    }

    const onChangeUnit = (e) =>{
        setItIsUnit(true);
        setUnit(e.target.value);
    }

    return (
        <section className="menu-section">
        
            <div className="unit-menu">
                <h1 className="unit-menu-title">Unit</h1>
                <ul className="unit-menu-list" onChange={onChangeUnit}>
                    <li className="unit-menu-item">
                        <input type="radio" id="imperial" value="imperial" name="unit" defaultChecked /> 
                        <label htmlFor="imperial">Fahrenheit</label>
                    </li>
                    <li className="unit-menu-item">
                        <input type="radio" id="metric" value="metric" name="unit" /> 
                        <label htmlFor="metric">Celcius</label>
                    </li>
                    <li className="unit-menu-item">
                        <input type="radio" id="standard" value="standard" name="unit" /> 
                        <label htmlFor="standard">Kelvin</label>
                    </li>
                </ul>
            </div>

            <div className="day-menu">
                <h1 className="day-menu-title">Day</h1>
                <ul className="day-menu-list" onChange={onChangeDay}>
                    <li className="day-menu-list-line-1">
                        <ul className="day-menu-items-1">
                            <li className="day-menu-item">
                                <input type="radio" id="0" value={0} name="day" defaultChecked /> 
                                <label htmlFor="0">Today</label>
                            </li>
                            <li className="day-menu-item">
                                <input type="radio" id="2" value={2} name="day" />
                                <label htmlFor="2">{numToWeekday(currentDay + 2)}</label>
                            </li>
                            <li className="day-menu-item">
                                <input type="radio" id="4" value={4} name="day" /> 
                                <label htmlFor="4">{numToWeekday(currentDay + 4)}</label>
                            </li>
                            <li className="day-menu-item">
                                <input type="radio" id="6" value={6} name="day" /> 
                                <label htmlFor="6">{numToWeekday(currentDay + 6)}</label>
                            </li>
                        </ul>
                    </li>

                    <li className="day-menu-list-line-2">
                        <ul className="day-menu-items-2">
                            <li className="day-menu-item">
                                <input type="radio" id="1" value={1} name="day" /> 
                                <label htmlFor="1">{numToWeekday(currentDay + 1)}</label>
                            </li>
                            <li className="day-menu-item">
                                <input type="radio" id="3" value={3} name="day" />
                                <label htmlFor="3">{numToWeekday(currentDay + 3)}</label>
                            </li>
                            <li className="day-menu-item">
                                <input type="radio" id="5" value={5} name="day" /> 
                                <label htmlFor="5">{numToWeekday(currentDay + 5)}</label>
                            </li>
                            <li className="day-menu-item">
                                <input type="radio" id="7" value={7} name="day" /> 
                                <label htmlFor="7">{numToWeekday(currentDay + 7)}</label>
                            </li>
                        </ul>
                    </li>

                    
                    
                    
                    
                    
                    
                    
                </ul>
            </div>
        </section>
    )
}

export default Menu;
