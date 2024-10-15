import { AccountCircle } from "@mui/icons-material";
import { Backdrop, Box, Button, Fade, IconButton, Menu, MenuItem, Modal, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { loginState } from "../recoilState";
import { useState } from "react";
import SocialGoogle from "./SocialGoogle";
import SocialKakao from "./SocialKakao";
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }; 

const LoginoutButton = () => {
    const [isLogin, setIsLogin] = useRecoilState(loginState);

    
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
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </>
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
                        Log in
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        <SocialGoogle />
                        <SocialKakao />
                        </Typography>
                    </Box>
                    </Fade>
                </Modal> 
            </>
        }
        </>
    )

}

export default LoginoutButton;