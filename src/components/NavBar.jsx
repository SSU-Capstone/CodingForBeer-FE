import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LoginoutButton from './LoginoutButton';
import { Typography } from '@mui/material';

export default function NavBar({children, title}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            {children}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <LoginoutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
