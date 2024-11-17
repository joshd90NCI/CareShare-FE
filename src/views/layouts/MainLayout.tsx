import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Toolbar,
} from '@mui/material';

import '../views.css';
import CreatePostModal from '../../containers/CreatePostModal.tsx';
import { useContext } from 'react';
import { modalOpenContext } from '../../contexts/ModalContext.tsx';
import { userContext } from '../../contexts/UserContext.tsx';

const MainLayout = () => {
  const { setModalDetails } = useContext(modalOpenContext);
  const { userDetails } = useContext(userContext);

  return (
    <div className="flex main-bg h-dvh overflow-auto">
      <Drawer
        variant="permanent"
        sx={{
          width: '10rem',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: '10rem', boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {userDetails && (
            <p className="text-center bg-green-200 p-3 rounded-lg m-2">
              Signed in as{' '}
              <b>
                {userDetails?.fName} {userDetails?.lName}
              </b>
            </p>
          )}
          <ListItem component="button">
            <ListItemButton>Home</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>Profile</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>Trending</ListItemButton>
          </ListItem>
          <ListItem>
            <Button variant="contained" onClick={() => setModalDetails({ openState: true })}>
              Ask Question
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <div className="relative flex-grow pt-20 px-5">
        <AppBar position="fixed" className="p-2 pl-40 !flex !justify-center">
          <TextField
            placeholder="Search for Issues here"
            variant="outlined"
            type="search"
            size="small"
            className="rounded-md"
            sx={{
              backgroundColor: 'white',
              width: '.33',
              maxWidth: '48rem',
              minWidth: '24rem',
              margin: 'auto',
              zIndex: 1,
            }}
          />
        </AppBar>
        <Outlet />
      </div>
      <CreatePostModal />
    </div>
  );
};

export default MainLayout;
