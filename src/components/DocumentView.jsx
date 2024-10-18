import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const DocumentView = ({docs}) => {
    const navigate = useNavigate();
    const handleDocumentClick=(e)=> {
        console.log(e.target.id)
        navigate('/editor')
    }

  return (
    <div className='p-4'>
        <h1>Groupname</h1>

        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {docs.map((docName, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <Item onClick={handleDocumentClick} id={index+1}>
                    {docName}
                </Item>
            </Grid>
            ))}
        </Grid>
        </Box>
    </div>
  );
}

export default DocumentView;