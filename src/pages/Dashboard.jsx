import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavBar from '../components/NavBar';
import DocumentView from '../components/DocumentView';
import { Box, Typography, Divider, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from "../recoilState";

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
  const [userDocuments, setUserDocuments] = useState([]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const chageGroup = (e) => {
    setGroupId(e.target.id);
  }

  const API_ADDR = import.meta.env.VITE_API_ADDR;

  const [groups, setGroups] = useState([]);
  useEffect(() => {
    fetch(API_ADDR + '/api/groups', {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setGroups(data)
      setGroupId(data[0])
      setDocuments(data[0])
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const addGroups = async () => {
    const groupName = newGroupName
    try {
      const response = await fetch(API_ADDR+ '/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: groupName }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errMessage = await response.json();
        throw new Error(errMessage.error || 'Error creating group');
      }

      const newGroup = await response.json();
      console.log(newGroup)
      // setSuccessMessage(`Group "${newGroup.name}" created successfully!`);
      // setGroupName(''); // Clear the input field
    } catch (err) {
      // setError(err.message || 'Error creating group');
    }
  }

  const setDocuments = async (groupName) => {
    const response = await fetch(API_ADDR + `/api/groups/${groupName}/documents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    setUserDocuments(data.document || []);
  }

  const [addGroupModal, setAddGroupModal] = useState(false);
  const closeModal3 = () => setAddGroupModal(false);
  const handleAddGroups = () => {
    setAddGroupModal(true)
  }
  const [modalOpen2, setModalOpen2] = useState(false);
  const closeModal2 = () => setModalOpen2(false);

  const handleAddDocument = () => {
    setModalOpen2(true);
  }

  const [newGroupName, setNewGroupName] = useState(null);
  const handleNewGroupNameChange = (e) => {
    setNewGroupName(e.target.value)
  }

  const addDocuments = async () => {
    const documentName = textFieldInput;
    console.log(documentName)
    const response = await fetch(API_ADDR + `/api/groups/${groupId}/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ document_name: documentName }),
      credentials: 'include',
    });
    console.log(response)

    const data = await response.json();
    console.log(data)
  }

  const inviteMember= () => {
    // Todo: copy invite member code to clipboard
    console.log('unimplemented feature')
  }

  const [textFieldInput, setTextFieldInput] = useState()
  const handleChange = (e) => {
    setTextFieldInput(e.target.value)
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
            {groups.map((group, idx) => 
              <MenuItem onClick={chageGroup} key={idx} id={group}>
                {group}
              </MenuItem>
            )}
          <Divider sx={{ my: 0.5 }} />

          <Button onClick={handleAddGroups}>
            <AddIcon />
            <Typography>
              group
            </Typography>
          </Button>
          <Modal
            open={addGroupModal}
            onClose={closeModal3}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create New Group
              </Typography>
              <TextField id="outlined-basic" label="title of new group" variant="outlined" onChange={handleNewGroupNameChange} />
              <Button onClick={addGroups}>OK</Button>
            </Box>
          </Modal>
        </StyledMenu>
      </NavBar>

      <div className='flex flex-col p-4 gap-10'>
        <div className='flex justify-between mx-4'>
          <Button onClick={openModal}>
            <h1 className={'font-bold text-3xl'}>{groupId}</h1>
          </Button>
          <Modal
            open={modalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {groupId}
              </Typography>
              <Button onClick={inviteMember}>
                invite member
              </Button>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {/* Todo : add member list */}
              </Typography>
            </Box>
          </Modal>

          <Button onClick={handleAddDocument}>
            <AddIcon />
            <Typography>
              document
            </Typography>
          </Button>
          <Modal
            open={modalOpen2}
            onClose={closeModal2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create New Document
              </Typography>
              <TextField id="outlined-basic" label="title of new document" variant="outlined" onChange={handleChange} />
              <Button onClick={addDocuments}>OK</Button>
            </Box>
          </Modal>
        </div>
        <DocumentView docs={userDocuments}/>
      </div>
    </>
  );
}
