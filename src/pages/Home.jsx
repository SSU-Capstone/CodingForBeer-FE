import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import SocialGoogle from '../components/SocialGoogle';
import SocialKakao from '../components/SocialKakao';
import Box from '@mui/material/Box'
import { useRecoilState } from 'recoil';
import { loginState } from '../recoilState';
import { AccountCircle } from '@mui/icons-material';
import LoginoutButton from '../components/LoginoutButton';

 

const Home = () => {

  return (
    <>
      <NavBar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home
        </Typography>
        <LoginoutButton />
      </NavBar>
    </>
  );
};

export default Home;