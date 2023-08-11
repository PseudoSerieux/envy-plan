import React, { useState } from 'react';
import './Home.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

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
    <Container fixed className="container">
      <Grid container direction="column" justifyContent="center" alignItems="center">
      <Box className="title" sx={{ display: 'flex', alignItems: 'center', p:2}}>

      <h1> Bienvenue sur Envy Plan !</h1>

      </Box>
      </Grid>
      <Box className="sub" component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center', p:3, fontSize: '1.3rem' }}>
            <TipsAndUpdatesOutlinedIcon/><span style={{textDecorationLine: 'underline', fontWeight: 'bold'}}> TODO</span> &nbsp; : Se connecter pour continuer
          </Box>
{/* Besoin d'un FormControl */}
          <Grid item p={1}>
            <TextField required label="Pseudo" variant="outlined"  
                       value={credentials.username} onChange={handleCredentialsChange}  autoFocus/>
          </Grid>
          <Grid item p={1}>
            <TextField required label="Mot de passe" type="password"
                       autoComplete="current-password" value={credentials.password}
                       onChange={handleCredentialsChangePwd}/>
            <Grid item pt={2}>
                <Link className="forgot-psw" to="/#" onClick={handleForgotPassword}>
                  Mot de passe oublié
                </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid item pt={3} display="flex" justifyContent="center" alignItems="center">
          <Link to="/#">
            <Button size="large" className="btn-connexion" type="submit" variant="contained"
            sx={{ borderRadius: '1.25rem', textTransform: 'capitalize', px: 6, fontWeight: 'bold'}} color="primary">
              Connexion
            </Button>
          </Link>
        </Grid>
        <Divider sx={{p:2}}> OU </Divider>
        <Grid item pb={3} display="flex" justifyContent="center" alignItems="center">
          <Link to="/inscription">
            <Button size="large" variant='outlined' className="btn-inscription" sx={{ borderRadius: '1.25rem', textTransform: 'capitalize', px: 6}}>
              Inscription
            </Button>
          </Link>
        </Grid>

      </Box>
    </Container>
  );
};

export default Home;
