import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home/Home';
import About from './pages/About';
import Logo from './Logo';
import Footer from './Footer';
import './App.css';



function App() {
  
  const [photoUrl, setPhotoUrl] = useState("");


  
  return (
    <main
      className="app"
      
      style={photoUrl !== '' ? {
        background: `url(${photoUrl})`        
      } : null}
      
    >

      <header className="header">
        <Logo />
        <Navbar />
      </header>
      

      <Switch>
        <Route path="/" exact render={() => <Home setPhotoUrl={setPhotoUrl}/> }/>
        <Route path="/about" component={About} />
      </Switch>

      <Footer />

    </main>
    
    

  );
}

export default App;
