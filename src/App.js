/* global google */
import React, { useEffect, useState } from 'react';

import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home/Home';
import About from './pages/About';
import Logo from './Logo';
import Footer from './Footer';
import './App.css';



function App() {

  const [photoUrl, setPhotoUrl] = useState("");

  const [placeId, setPlaceId] = useState('');

  useEffect(() => {

    const initialize = () => {
      if(placeId) {
        console.log(placeId);
        const request = {
            placeId: placeId
          };
      
          let service = new google.maps.places.PlacesService(
            document.createElement("div")
          );
          service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(place);
                console.log('place call made');
                console.log(place.photos);
                for (let placePhoto of place.photos) {
                  //const { innerWidth: width, innerHeight: height } = window;
                  if (placePhoto.height >= 800 & placePhoto.width >=1200) {
                    if (!(placePhoto.height * 1.3 >= placePhoto.width)) {
                      setPhotoUrl(placePhoto.getUrl({ maxWidth: 5000, maxHeight: 5000 }));
                    }
                  }
                }
            }
          });
      }
      
    };

    const createScriptLoadMap = () => {
      let gScript = document.querySelector("[data-setted]");
      let isSetted = gScript && gScript.getAttribute("data-setted");
  
      if (!isSetted) {
        let index = document.getElementsByTagName("script")[0];
        let script = document.createElement("script");
        script.src =
          "https://maps.google.com/maps/api/js?key=AIzaSyCAQoJ1jsE-tYAC-sZ4_O_xwaLBC4JQy94&libraries=places&callback=initialize";
        script.async = true;
        script.defer = true;
        script.setAttribute("data-setted", true);
        index.parentNode.insertBefore(script, index);
        window.initialize = initialize;
      } else {
        initialize();
      }
    };

    createScriptLoadMap();
  }, [placeId, setPhotoUrl]);

  return (
    <main
      className="app"
      style={photoUrl !== '' ? {
        backgroundImage: `url(${photoUrl})`        
      } : null}
    >

      <header className="header">
        <Logo />
        <Navbar />
      </header>
      

      <Switch>
        <Route path="/" exact render={() => <Home setPlaceId={setPlaceId} /> }/>
        <Route path="/about" component={About} />
      </Switch>

      <Footer />

    </main>
    
    

  );
}

export default App;
