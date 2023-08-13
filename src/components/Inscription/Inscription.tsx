import React, { FormEvent, useState, useEffect, useCallback } from 'react';
import { useForm  } from 'react-hook-form';
import * as yup from 'yup';
import './Inscription.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, Container, Divider, FormControl, FormControlLabel, FormHelperText, Grid, useFormControl } from '@mui/material';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const Inscription = () => {
  const form = useForm({
    reValidateMode: 'onBlur',
  });

  const schema = yup.object({
    pseudo:yup.string().required(),
    email:yup.string().email().required(),
    password: yup.string().required().length(8).uppercase().lowercase(),
  });

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
    form.setValue('password', e.target.value);
  };

  const handleBlurPwd = useCallback(async () => {
    const errors = await schema.validate(form.getValues);
    const passwordError = errors.password;
    setErrorPwd(passwordError);
  }, [form.getValues, schema]);

  useEffect(() => {
    handleBlurPwd();
  }, [form.formState, handleBlurPwd]);

  //helper down pswd
  function MyFormHelperText() {
    const { focused } = useFormControl() || {};
  
    const helperText = React.useMemo(() => {
      if (focused) {
        return 'This field is being focused';
      }
  
      return 'Helper text';
    }, [focused]);
    return (<FormHelperText>{helperText}</FormHelperText>);
  }

  //Submit
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    // submitForm(form.getValues());
    throw new Error('Function not implemented.');
  }

    return (
        <Container>
          <Box className="sub" component="form" onSubmit={handleSubmit} autoComplete="off">
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', p:2, fontSize: '1.3rem' }}>

              <BookmarkAddIcon/><span style={{textDecorationLine: 'underline', fontWeight: 'bold'}}> TODO</span> &nbsp; : S'inscrire pour ne plus jamais rien oublier !
              {/* une mémoire qui ne vous fait jamais défaut ? */}
              </Box>

              {/* TODO : formControl : MyFormHelper + Conf mdp*/}
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
                {/* Mdp requis : au moins 8 caractères + une lettre minuscule + une lettre majuscule */}
                <TextField required label="Mot de passe" type="password"
                           autoComplete="current-password" onChange={handleChangePwd} onBlur={handleBlurPwd}/>
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
                 {/* TODO : redirect connexion avec wait + toastr "Done : bien inscrits" */}
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