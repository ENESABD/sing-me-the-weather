import React, { Fragment, useState } from 'react';
import Welcome from './Welcome';
import Weather from './Weather';
import Song from './Song';
import Menu from './Menu';

function Home({ setPlaceId }) {


    

    const [hasWelcomed, setWelcomed] = useState(false);

    const [forCategory, setForCategory] = useState({});
    const [unit, setUnit] = useState('imperial');
    const [day, setDay] = useState('0');
    const [itIsUnit, setItIsUnit] = useState(null);

    


    return (
        <Fragment>
            {!(hasWelcomed) ? <Welcome setWelcomed={setWelcomed} /> :
        
            <main className="home">

                
                <Weather setForCategory={setForCategory} unit={unit} day={day} itIsUnit={itIsUnit} setPlaceId={setPlaceId} />

                <Song forCategory={forCategory} />
                <Menu setUnit={setUnit} setDay={setDay} setItIsUnit={setItIsUnit} />

                

            </main>
            }
        </Fragment>
    )
}

export default Home;
