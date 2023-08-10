import React, { FormEvent, useState } from 'react';
import './Inscription.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Divider, Grid, } from '@mui/material';
import { theme } from '../../utils/theme';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Inscription = () => {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

    return (
        <Container>
          <h1 id='welcome'>Bienvenue sur Envy Plan !</h1>
          <Box className="sub" component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <h3> <span style={{textDecorationLine: 'underline'}}> TODO</span> : S'inscrire pour obtenir une mémoire 2.0 !</h3>
          <Grid item p={3} display="flex" justifyContent="center" alignItems="center">            
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