import { Backdrop, Box, Button, Fade, IconButton, Menu, MenuItem, Modal, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { loginState } from "../recoilState";
import { useState } from "react";
import SocialGoogle from "./SocialGoogle";
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '2rem',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '300px',
  height: '100%',
  justifyContent: 'space-around',
}; 

const LoginoutButton = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLogin(false);
    navigate('/');
  }
  
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
  return (
    <>
    {isLogin ? 
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
        :
        <>
          <Button color="inherit" onClick={handleOpen}>Login</Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
          >
            <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                로그인
              </Typography>

              <div className={'flex flex-col gap-5'}>
                <SocialGoogle />
              </div>
            </Box>
            </Fade>
          </Modal>
      </>
    }
    </>
  )

}

export default LoginoutButton;