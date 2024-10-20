import * as React from 'react';
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import {useNavigate} from 'react-router-dom';
import {Image} from "@mui/icons-material";

const Item = styled(Paper)(({theme}) => ({
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
  const handleDocumentClick = (e) => {
    console.log(e.target.id)
    navigate('/editor')
  }

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
          {docs.map((docName, index) => (
            <Grid key={index} size={{xs: 2, sm: 4, md: 4}}>
              <div
                onClick={handleDocumentClick}
                id={`docName-${index + 1}`}
                className={'rounded-xl bg-slate-100 flex justify-center items-center h-52 hover:border-2 hover:border-slate-400'}
              >
                <img src={'/tmp_image.jpg'} className={'object-cover'}/> {/*TODO: 추 후 이미지 썸네일 경로로 수정*/}
              </div>
              <span className={'pl-2'}>{docName}</span>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default DocumentView;