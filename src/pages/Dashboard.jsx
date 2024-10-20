import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavBar from '../components/NavBar';
import DocumentView from '../components/DocumentView';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function Dashborad() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [groupId, setGroupId] = useState('boj');
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setGroupId(e.target.id)
    setAnchorEl(null);
  };

  const groups = [
    {name : 'coding for beer', },
    {name : 'asdf'},
    {name : 'boj'},
    {name : 'noj.am'},
  ];

  const docs = {
    'coding for beer' : ['doc1', 'doc2', 'doc3'], 
    'asdf' : ['doc1'],
    'boj' : ['doc1', 'doc2'],
    'noj.am' : ['doc1', 'doc1', 'doc1', 'doc1', 'doc1']
  }

  return (
    <>
      <NavBar title={'Dashborad'}>
        <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon/>}
        >
          Groups
        </Button>
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
          {groups.map((group, idx) => {
            return (
                <MenuItem onClick={handleClose} key={idx} id={group.name}>
                  {group.name}
                </MenuItem>
            );
          })}
        </StyledMenu>
      </NavBar>

      <div className='flex flex-col p-4 gap-10'>
        <h1 className={'font-bold text-3xl'}>{groupId}</h1>
        <DocumentView docs={docs[groupId]}/>
      </div>
    </>
  );
}
