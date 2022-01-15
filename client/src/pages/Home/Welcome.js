import React from 'react'

function Welcome({ setWelcomed }) {

    const onClickWelcome = () => {
        setWelcomed(true);
      }


    return (
        <main className="welcome">
            <div className="welcome-contents">
                <p className="greeting-text">Welcome! Here you can see the weather forecast and listen to a song</p>
                <button className="start-button" onClick={onClickWelcome}>Sing me the weather!</button> 
            </div>
           
        </main>
    )
}

export default Welcome;
