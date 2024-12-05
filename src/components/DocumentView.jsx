import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import {useNavigate} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DocumentView = ({docs}) => {
  const navigate = useNavigate();
  const handleDocumentClick = (e) => {
    console.log(e.currentTarget.id)
    navigate(`/editor?docu=${e.currentTarget.id}`)
  }

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
          {docs.map((docName, index) => {
            const [date1, date2] = [new Date(new Date().getTime() + Math.random() * (new Date(2025, 0, 1) - new Date())), new Date(new Date().getTime() + Math.random() * (new Date(2025, 0, 1) - new Date()) + (new Date(2025, 0, 1) - new Date()))].map(date => date.toISOString().split('T')[0]);
            return (
            <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>
              <div
                onClick={handleDocumentClick}
                id={docName || "no"}
              >
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                      Created At: {date1}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {docName}
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="body2">
                      Last edited : {date2}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          )}
          )}
        </Grid>
      </Box>
    </>
  );
}

export default DocumentView;