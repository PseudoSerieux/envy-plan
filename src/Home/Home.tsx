import React, { useState } from 'react';
import './Home.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Link, ThemeProvider } from '@mui/material';
import { theme } from '../theme';

const Home = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleCredentialsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [id]: value }));
  };

  const handleForgotPassword = () => {
    // Logic to handle the "Mot de passe oublié" functionality
    // Redirect the user to the password reset page
    // You can implement your own logic here
    console.log("Mot de passe oublié");
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Logique pour gérer la soumission du formulaire de connexion
    try {
      //TODO : voir nom serveur
      const response = await fetch('http://localhost:3000/api/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
          if (data.success && data.token) {
      // Stocker le token dans le localStorage
      localStorage.setItem('authToken', data.token);
      // Rediriger l'utilisateur vers la page appropriée
        window.location.href = '/app'; // Rediriger l'utilisateur vers la page appropriée
      } else {
      // La connexion a échoué, afficher un message d'erreur à l'utilisateur
      // ...
    }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      // Afficher un message d'erreur à l'utilisateur
    }
    // ...
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <h1 id='welcome'>Bienvenue sur Envy Plan !</h1>
      <div className="sub">
      <h3> <span style={{textDecorationLine: 'underline'}}> TODO :</span> Se connecter pour continuer </h3>
      <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '25ch', color:'primary'  },}} noValidate autoComplete="off" >
        <div>
          <TextField required className="custom-textfield" label="Pseudo" variant="outlined"  
                      value={credentials.username} onChange={handleCredentialsChange}  autoFocus/>
        </div>
        <div>
          <TextField required className="custom-textfield" label="Mot de passe" type="password"
                     autoComplete="current-password" value={credentials.password}
                     onChange={handleCredentialsChange}/>
          <div>
              <Link className="forgot-psw" href="./App.tsx" onClick={handleForgotPassword}>
                Mot de passe oublié
              </Link>
          </div>
        </div>
        <Button className="btn-connexion" type="submit" href=" " variant="contained" 
                sx={{  borderRadius: '1.25rem', textTransform: 'capitalize' }} color="primary">
                  Connexion
        </Button>
        <hr/>
        <Button variant='outlined' className="btn-inscription" href=" " 
                sx={{ borderRadius: '1.25rem', textTransform: 'capitalize' }}>
                  Inscription
        </Button>
      </Box>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default Home;
