import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Home = () => {

  return (
    <>
      <NavBar title={'Home'}>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
        <MenuIcon />
        </IconButton>
      </NavBar>
    </>
  );
};

export default Home;