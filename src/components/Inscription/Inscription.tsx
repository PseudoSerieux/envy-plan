import React, { FormEvent, useRef, useState, useEffect } from 'react';
import './Inscription.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, Container, Divider, FormControl, FormControlLabel, FormHelperText, Grid, useFormControl, InputLabel } from '@mui/material';
import { theme } from '../../utils/theme';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const Inscription = () => {
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

  //helper down pswd
  function MyFormHelperText() {
    const { focused } = useFormControl() || {};
  
    const helperText = React.useMemo(() => {
      if (focused) {
        return 'This field is being focused';
      }
  
      return 'Helper text';
    }, [focused]);
    return <FormHelperText>{helperText}</FormHelperText>;
  }

  //Submit
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

    return (
        <Container>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Box className="title" sx={{ display: 'flex', alignItems: 'center', p:2}}>
            <h1> Bienvenue sur Envy Plan !</h1>
            </Box>
          </Grid>
          <Box className="sub" component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', p:2, fontSize: '1.3rem' }}>

              <BookmarkAddIcon/><span style={{textDecorationLine: 'underline', fontWeight: 'bold'}}> TODO</span> &nbsp; : S'inscrire pour ne plus jamais rien oublier !
              {/* une mémoire qui ne vous fait jamais défaut ? */}
              </Box>

              {/* TODO : formControl */}
              <FormControl>
              <Grid item p={1} display="flex" justifyContent="center" alignItems="center">
                <TextField required label="Pseudo" variant="outlined"  
                           autoFocus />
              </Grid>
              <Grid item p={1} display="flex" justifyContent="center" alignItems="center">
                <TextField required label="Email" variant="outlined"  
                           onBlur={handleBlur} onChange={handleChange}/>
              </Grid>
              <Grid item p={1} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <TextField required label="Mot de passe" type="password"
                           autoComplete="current-password" />
                           <MyFormHelperText />
                           {/* cf : useFormControl MUI */}
              </Grid>
              <Grid item p={1} display="flex" justifyContent="center" alignItems="center">
                <TextField required label="Confirmation du mot de passe" type="password"
                           autoComplete="current-password" />
              </Grid>
              <Grid item p={2} display="flex" justifyContent="center" alignItems="center">
              <FormControlLabel required control={<Checkbox />} label="J'ai lu et j'accepte les CGU " />
              </Grid>
              </FormControl>

            </Grid>
          
          <Grid item p={2} display="flex" justifyContent="center" alignItems="center">            
            <Link to="/inscription">
              <Button size="large" className="btn-insc" type="submit" variant="contained"
              sx={{ borderRadius: '1.25rem', textTransform: 'capitalize', px: 6, fontWeight: 'bold'}} color="primary">
                S'inscrire !
              </Button>
            </Link>
          </Grid>
          <Divider />
          <Grid item p={3} display="flex" justifyContent="center" alignItems="center">            
            <Link to="/">
              <Button size="large" className="btn-annuler"variant='outlined' 
              sx={{ borderRadius: '1.25rem', textTransform: 'capitalize', marginBottom: "30px", px: 6}}>
                Retour
              </Button>
            </Link>
          </Grid>
          
          </Box>
        </Container>
      );
}
export default Inscription;