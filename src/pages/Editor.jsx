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
import EditIcon from '@mui/icons-material/Edit';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

const Editor = () => {
    const [markdown, setMarkdown] = useState('# title 1')
    const handleUpdate = (e) => setMarkdown(e.target.value)

  const [mode, setMode] = useState('both'); // edit, both, preview

  return (
    <div className='max-h-screen'>
        <NavBar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{setMode('edit')}}
            >
            <EditIcon />
        </IconButton>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{setMode('both')}}
            >
            <VerticalSplitIcon />
        </IconButton>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{setMode('preview')}}
            >
            <VisibilityIcon />
        </IconButton>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            >
            {/* <MenuIcon /> */}
            <DownloadIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='flex justify-center'>
        Document
        </Typography>
        <LoginoutButton />
        </NavBar>

        <div className='flex'>
            {mode == "edit" && (
                <TextEditor>
                    <textarea value={markdown} onChange={handleUpdate} />
                </TextEditor>
            )}
            {mode == "both" && (
                <>
                    <TextEditor>
                        <textarea value={markdown} onChange={handleUpdate} className='w-full h-full' />
                    </TextEditor>
                    <PPTRender markdown={markdown} />
                </>
            )}
            {mode == "preview" && (
                <PPTRender markdown={markdown} />
            )}
        </div>
    </div>
  );
};

export default Editor;