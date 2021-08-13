import React from 'react'

function Welcome({ setWelcomed }) {


    const onClickWelcome = () => {
        setWelcomed(true);
      }


    return (
        <div>
            <h1>Welcome! Here you can see the weather forecast and listen to a song</h1>
            <button onClick={onClickWelcome}>Sing me the weather!</button> 
        </div>
    )
}

export default Welcome;
