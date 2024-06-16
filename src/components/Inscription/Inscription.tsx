import React, { FormEvent, useState, useEffect, useCallback } from 'react';
import { useForm  } from 'react-hook-form';
import * as yup from 'yup';
import './Inscription.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, Container, Divider, FormControl, FormControlLabel, FormHelperText, Grid, useFormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useSnackbar } from '../../utils/SnackbarContext';

const Inscription = () => {
  const form = useForm({
    reValidateMode: 'onBlur',
  });
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const schema = yup.object({
    pseudo:yup.string().required(),
    email:yup.string().email().required(),
    password: yup.string().required().min(8).uppercase().lowercase(),
  });

  //Controle Pseudo
  const [username, setUsername] = useState('');

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  //Controle Email
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleBlur = () => {
  if (!email.includes('@') || !email.endsWith('.com') || !email.endsWith('.fr') || !email.endsWith('.net')) {
    setError('Email invalide');
  } else {
    setError('');
  }
  };

  useEffect(() => {
    setError(email.includes('@') || !email.endsWith('.com') || !email.endsWith('.fr') || !email.endsWith('.net') ? 'Email invalide' : '');
  }, [email]);

  //Controle Pwd
  const [password, setPassword] = useState('');
  const [errorPwd, setErrorPwd] = useState('');
  
  const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleBlurPwd = useCallback(async () => {
    const errors = await schema.validate(form.getValues);
    const passwordError = errors.password;
    setErrorPwd(passwordError);
  }, [form.getValues, schema]);

  useEffect(() => {
    handleBlurPwd();
  }, [password, handleBlurPwd]);

  //Controle conf == pwd
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleChangeConfirmPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  //Submit
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      showSnackbar("Les mots de passe ne correspondent pas :(", 'warning');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        // Redirige l'utilisateur vers la page de connexion
        navigate('/?signin=success', { state: { isSignIn: true}}); 
      } else {
        showSnackbar(`Une erreur s'est produite: ${responseData.message}`, 'error');
      }
    } catch (error) {
      showSnackbar("Oups, une erreur s'est produite ! (ça ne vient pas de vous)", 'error');
    } finally {
      setIsLoading(false);
    }
  };

    return (
      
    <div className="background-container">
        <Container>
          <Box className="sub" component="form" onSubmit={handleSubmit} autoComplete="off">
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', p:3, fontSize: '1.3rem', color: 'var(--purple-color)' }}>
              <BookmarkAddIcon/><span style={{textDecorationLine: 'underline', fontWeight: 'bold'}}> TODO</span> &nbsp; : S'inscrire pour ne plus jamais rien oublier !
              {/* une mémoire qui ne vous fait jamais défaut ? */}
              </Box>

              <FormControl>
                <Grid item p={1} display="flex" justifyContent="center" alignItems="center">
                  <TextField required label="Pseudo" variant="outlined"  
                             autoFocus onChange={handleChangeUsername} />
                </Grid>
                <Grid item p={1} display="flex" justifyContent="center" alignItems="center">
                  <TextField required label="Email" variant="outlined"  
                             onBlur={handleBlur} onChange={handleChange}/>
                </Grid>
                <Grid item p={1} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                  {/* Mdp requis : au moins 8 caractères + une lettre minuscule + une lettre majuscule */}
                  <TextField required label="Mot de passe" type="password"
                             autoComplete="current-password" onChange={handleChangePwd} onBlur={handleBlurPwd}/>
                      <FormHelperText id="component-helper-text">8 caractères minimum, 1 majuscule, 1 caractère spécial</FormHelperText>
                             {/* cf : useFormControl MUI */}
                </Grid>
                <Grid item p={1} display="flex" justifyContent="center" alignItems="center">
                  <TextField required label="Confirmation du mot de passe" type="password"
                             autoComplete="current-password" onChange={handleChangeConfirmPwd}/>
                </Grid>
              </FormControl>
            </Grid>

          <Grid item pt={2} display="flex" justifyContent="center" alignItems="center">
                <FormControlLabel className='cgu' required control={<Checkbox />} label="J'ai lu et j'accepte les CGU." />
          </Grid>
          <Grid item pt={4} display="flex" justifyContent="center" alignItems="center">    
              <Button disabled={isLoading} size="large" className="btn-insc" type="submit" variant="contained"
              sx={{ borderRadius: '1.25rem', textTransform: 'capitalize', px: 6, fontWeight: 'bold'}} color="primary">
                S'inscrire !
              </Button>
          </Grid>
          <Divider sx={{p:1}}/>
          <Grid item pt={2} pb={4} display="flex" justifyContent="center" alignItems="center">            
            <Link to="/">
              <Button size="large" className="btn-annuler" variant='outlined' 
              sx={{ borderRadius: '1.25rem', textTransform: 'capitalize', px: 6}}>
                Retour
              </Button>
            </Link>
          </Grid>
          
          </Box>
        </Container>
        </div>
      );
}
export default Inscription;