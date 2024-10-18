import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = () => {
  return (
    <>
      <NavBar title={'Dashboard'}>
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

export default Dashboard;
