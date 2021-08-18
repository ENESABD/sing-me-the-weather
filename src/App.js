import React, { useState } from 'react';

import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home/Home';
import About from './pages/About';
import './App.css';



function App() {

  const [photoUrl, setPhotoUrl] = useState("");


  return (
    <div style={photoUrl !== '' ? {
          backgroundImage: `url(${photoUrl})`,
          height: "100%",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
          } : null}>

      <Navbar />

      <Switch>
        <Route path="/" exact render={() => <Home setPhotoUrl={setPhotoUrl} /> }/>
        <Route path="/about" component={About} />
      </Switch>

    </div>
    
    
  );
}

export default App;
