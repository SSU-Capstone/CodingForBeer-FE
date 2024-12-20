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

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [groupId, setGroupId] = useState('Empty...');
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

  const changeGroup = (e) => {
    setGroupId(e.target.id);
    setDocuments(e.target.id)
  }

  const API_ADDR = import.meta.env.VITE_API_ADDR;

  const [trigger, setTrigger] = useState(false);

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
      console.log(newGroup);
      // changeGroup(newGroup.name);
      setGroups((prev)=>[...prev, newGroup.name]);
      setGroupId(newGroup.name);
      setDocuments(newGroup.name);
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
    setDocuments(groupId);
    console.log(data)
  }

  const inviteMember = async () => {
    // Todo: copy invite member code to clipboard
    console.log('unimplemented feature');
    const response = await fetch(API_ADDR + `/api/groups/${groupId}/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    const link = data.inviteLink;
    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        console.log("Text copied to clipboard:", text);
      } catch (err) {
        console.error("Failed to copy text to clipboard:", err);
      }
    };
    
    copyToClipboard(link);
    alert("초대링크가 복사되었습니다!");

  }

  const [textFieldInput, setTextFieldInput] = useState()
  const handleChange = (e) => {
    setTextFieldInput(e.target.value)
  }

  return (
    <>
      <NavBar title={'Dashboard'}>
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
              <MenuItem onClick={changeGroup} key={idx} id={group}>
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
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2
                  id="modal-modal-title"
                  className="text-xl font-semibold text-gray-800 mb-4"
                >
                  Create New Group
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="new-group-title"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    Title of New Group
                  </label>
                  <input
                    id="new-group-title"
                    type="text"
                    placeholder="Enter group title"
                    onChange={handleNewGroupNameChange}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addGroups}
                  className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  OK
                </button>
              </div>
            </div>
          </Modal>
        </StyledMenu>
      </NavBar>

      <div className='flex flex-col p-4 gap-10'>
        <div className='flex justify-between mx-4'>
          <Button onClick={inviteMember}>
            <h1 className={'font-bold text-3xl'}>{groupId}</h1>
          </Button>
          <Modal
            open={modalOpen2}
            onClose={closeModal2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2
                  id="modal-modal-title"
                  className="text-xl font-semibold text-gray-800 mb-4"
                >
                  Create New Document
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="new-document-title"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    Title of New Document
                  </label>
                  <input
                    id="new-document-title"
                    type="text"
                    placeholder="Enter document title"
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={addDocuments}
                  className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  OK
                </button>
              </div>
            </div>
          </Modal>
          <Button onClick={handleAddDocument}>
            <AddIcon />
            <Typography>
              Document
            </Typography>
          </Button>
        </div>
        <DocumentView docs={userDocuments} group={groupId}/>
      </div>
    </>
  );
}
