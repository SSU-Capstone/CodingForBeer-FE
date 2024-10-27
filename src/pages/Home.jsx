import NavBar from '../components/NavBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function InboxIcon() {
  return null;
}

function MailIcon() {
  return null;
}

const Home = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItemButton onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={'대시보드'} />
        </ListItemButton>
        {/* 나머지 항목 추가 */}
      </List>
    </Box>
  );

  return (
    <>
      <NavBar title={'Home'}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{mr: 2}}
          onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </NavBar>
      <div className={'flex flex-col mx-auto w-5/6 h-full mt-6 gap-12'}>
        <div
          className={'flex justify-center items-center w-full mx-auto h-64 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 z-10'}>
          <span className={'text-white text-xl break-all font-bold md:text-4xl sm:text-2xl'}>Conflict-free 마크다운 슬라이드 편집기를 만나보세요!</span>
        </div>

        <div className={'w-full'}>
          <span className={'font-bold text-2xl text-slate-600'}>최근 문서</span>
          {/*TODO: 나중에 최근 항목 만들 때 DASHBOARD의 Grid항목을 참고해 추가*/}
        </div>
      </div>
    </>
  );
};

export default Home;