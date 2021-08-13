import React, { useState } from 'react';
import Welcome from './Welcome';
import Weather from './Weather';
import Song from './Song';
import Menu from './Menu';

function Home() {

    const [hasWelcomed, setWelcomed] = useState(false);

    const [forCategory, setForCategory] = useState({});
    const [unit, setUnit] = useState('imperial');
    const [day, setDay] = useState('0');
    const [itIsUnit, setItIsUnit] = useState(null);

    return (
        <div>
            {!(hasWelcomed) ? <Welcome setWelcomed={setWelcomed} /> :
            
            <div>
                <br/>
                <br/>

                <Weather setForCategory={setForCategory} unit={unit} day={day} itIsUnit={itIsUnit} />

                <br/>
                <br/>
                <hr/>
                <hr/>
                <hr/>
                <br/>
                <br/>

                <Song forCategory={forCategory} />

                <br/>
                <br/>
                <hr/>
                <hr/>
                <hr/>
                <br/>
                <br/>

                <Menu setUnit={setUnit} setDay={setDay} setItIsUnit={setItIsUnit} />
            </div>
            }
        </div>
    )
}

export default Home;
