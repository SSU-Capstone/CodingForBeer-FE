import React, { useState } from 'react';
import PPTRender from '../components/PPTRender';
import TextEditor from '../components/TextEditor';
import NavBar from '../components/NavBar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ReactCodeMirror from '@uiw/react-codemirror';

const Editor = () => {
    const [markdown, setMarkdown] = useState('# title 1')
    const handleUpdate = (e) => {
        setMarkdown(e)
    }

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
            <DownloadIcon />
        </IconButton>
        </NavBar>

        <div className='flex'>
            {mode == "edit" && (
                <TextEditor>
                    <ReactCodeMirror
                        height="100px"
                        onChange={handleUpdate}
                    />
                </TextEditor>
            )}
            {mode == "both" && (
                <>
                    <TextEditor>
                        <ReactCodeMirror
                            height="100px"
                            onChange={handleUpdate}
                        />
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