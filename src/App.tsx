import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './utils/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connexion from './components/Connexion/Connexion';
import Inscription from './components/Inscription/Inscription';
import Home from './components/Home/Home';

const App = () => {
  // const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/index" element={<Home />} />
        </Routes>
      </Router>

      {/*
         <div>
          {loggedIn ? <p>Vous êtes connecté !</p> : <Home />}
        </div> */}
    </ThemeProvider>
  );
};

export default App;
