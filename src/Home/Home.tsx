import React, { useState } from 'react';
import './Home.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Link, ThemeProvider } from '@mui/material';
import { theme } from '../theme';
import { toast } from 'react-toastify';

const Home = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleCredentialsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, username: value }));
  };

  const handleCredentialsChangePwd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, password: value }));
  };

  const handleForgotPassword = () => {
    console.log("Mot de passe oublié");
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Logique pour gérer la soumission du formulaire de connexion
    try {
      console.log("cc")
      //TODO : voir nom serveur
      const response = await fetch('http://localhost:8080/api/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      }
      );
      console.log("response" + JSON.stringify(credentials));

      if(response.ok){
              const data = await response.json();
      console.log("response" + data);

          if (data.success && data.token) {
            // Stocker le token dans le localStorage
            localStorage.setItem('authToken', data.token);
            // Rediriger l'utilisateur vers la page appropriée
            window.location.href = '/app';
            console.log("gg wp")
          } else {
            // La connexion a échoué, afficher un message d'erreur à l'utilisateur
            console.log("sale merde")
            toast.warn("La tentative de connexion a échoué, pas sûr que ce soit de votre faute", {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }) 
          }
      } else {
        // Gérer le cas où la réponse n'est pas "ok"
        console.error('Erreur de réponse du serveur:', response.status, response.statusText);
        toast.warn("Erreur lors de la connexion au serveur", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",        
        });
       }
    } catch (error) {
      console.error('Erreur lors de la connexion', error);
      // Afficher un message d'erreur à l'utilisateur
      toast.warn("Erreur lors de la tentative de connexion (mauvais identifiants ?)", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <div className="container">
      <h1 id='welcome'>Bienvenue sur Envy Plan !</h1>
      <div className="sub">
      <h3> <span style={{textDecorationLine: 'underline'}}> TODO :</span> Se connecter pour continuer </h3>
      <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '25ch', color:'primary' },}} noValidate autoComplete="off" >
        <div>
          <TextField required className="custom-textfield" label="Pseudo" variant="outlined"  
                      value={credentials.username} onChange={handleCredentialsChange}  autoFocus/>
        </div>
        <div>
          <TextField required className="custom-textfield" label="Mot de passe" type="password"
                     autoComplete="current-password" value={credentials.password}
                     onChange={handleCredentialsChangePwd}/>
          <div>
              <Link className="forgot-psw" href="#" onClick={handleForgotPassword}>
                Mot de passe oublié
              </Link>
          </div>
        </div>
        <Button className="btn-connexion" type="submit" variant="contained" 
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
