import React from 'react';

function Icon({ iconCode }) {

    return (
        <div>
            {iconCode ? <img src={require(`../../icons/${iconCode}.svg`).default} alt="weather icon" width="100" height="50" /> : null}
        </div>
    )
}

export default Icon;
