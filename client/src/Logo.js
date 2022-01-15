import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
    return (
        <figure className="logo">
            <Link to="/">SingMeTheWeather</Link>
        </figure>
        
    )
}

export default Logo;
