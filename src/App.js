import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home/Home';
import About from './pages/About';
import './App.css';



function App() {

  return (
    <div>
      <Navbar />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Switch>

    </div>
    
    
  );
}

export default App;
