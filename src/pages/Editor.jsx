import React, { useState } from 'react';
import PPTRender from '../components/PPTRender';
import TextEditor from '../components/TextEditor';
import NavBar from '../components/NavBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LoginoutButton from '../components/LoginoutButton';

const Editor = () => {
    const [markdown, setMarkdown] = useState('# title 1')
    const handleUpdate = (e) => setMarkdown(e.target.value)

    
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [mode, setMode] = useState();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
            Editor
          </Typography>
          <LoginoutButton />
    </NavBar>
      <div>
        <TextEditor>
            <textarea value={markdown} onChange={handleUpdate} />
        </TextEditor>
        <PPTRender markdown={markdown} />
      </div>
    </>
  );
};

export default Editor;