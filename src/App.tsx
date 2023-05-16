import React from 'react';
import './App.css';
import Home from './Home/Home';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
     <div>
      {loggedIn ? <p>Vous êtes connecté !</p> : <Home />}
    </div>
    </ThemeProvider>
  
  );
};

export default App;
