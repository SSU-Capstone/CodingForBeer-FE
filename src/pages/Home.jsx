import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SocialGoogle from '../components/SocialGoogle'

export default function BasicCard() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Card sx={{ minWidth: '20rem', maxWidth: '40rem', maxHeight: '20rem' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ textAlign: 'center'}}>
            Log In
          </Typography>
        </CardContent>
        <CardContent>
          <SocialGoogle />
        </CardContent>
      </Card>
    </div>
  );
}
