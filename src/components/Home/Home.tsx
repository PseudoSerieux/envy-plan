import React, { FormEvent, useState, useEffect, useCallback } from 'react';
import './Home.css'
import Container from '@mui/material/Container';
import Navbar from './Navbar/Navbar';

const Home = () => {
console.log("Vous êtes connecté !")

    return(
      <><Navbar />
      <Container>

        <div> <span> CONNECTE GG WP </span></div>
      </Container></>
    );
}

export default Home;