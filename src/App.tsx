import React, { useState } from 'react';
import './App.css';
import { Alert, Snackbar, ThemeProvider } from '@mui/material';
import { theme } from './utils/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connexion from './components/Connexion/Connexion';
import Inscription from './components/Inscription/Inscription';
import Home from './components/Home/Home';
import ProtectedRoute from './utils/ProtectedRoute';
import { SnackbarProvider } from'./utils/SnackbarContext';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Vérifiez le token dans le localStorage

  return (
    <ThemeProvider theme={theme}>
            <SnackbarProvider>
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
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
