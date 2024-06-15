import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './utils/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connexion from './components/Connexion/Connexion';
import Inscription from './components/Inscription/Inscription';
import Home from './components/Home/Home';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  // const [loggedIn, setLoggedIn] = React.useState(false);
  const isAuthenticated = !!localStorage.getItem('authToken'); // Vérifiez le token dans le localStorage

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/index"             element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>} />
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
