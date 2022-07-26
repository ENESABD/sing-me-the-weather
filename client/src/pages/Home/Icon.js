import React, { Fragment } from 'react';

function Icon({ iconCode }) {


    return (
        <Fragment>
            {iconCode ? 
                <img src={require(`../../assets/icons/${iconCode}.svg`)} alt="weather icon" width="50" height="50" /> 
            : null}
        </Fragment>
            

    )
}

export default Icon;
