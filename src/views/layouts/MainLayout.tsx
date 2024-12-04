import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Button, Drawer, List, ListItem, ListItemButton, Toolbar } from '@mui/material';

import '../views.css';
import CreatePostModal from '../../containers/CreatePostModal.tsx';
import { useContext, useEffect } from 'react';
import { modalOpenContext } from '../../contexts/ModalContext.tsx';
import { userContext } from '../../contexts/UserContext.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import { SearchContextProvider } from '../../contexts/SearchContext.tsx';

const MainLayout = () => {
  const { setModalDetails } = useContext(modalOpenContext);
  const { userDetails } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) {
      navigate('/login');
    }
  }, [userDetails, navigate]);

  return (
    <SearchContextProvider>
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
            {(userDetails?.roles?.includes('ADMIN') ||
              userDetails?.roles?.includes('MODERATOR')) && (
              <ListItem>
                <ListItemButton onClick={() => navigate('/admin')}>Admin</ListItemButton>
              </ListItem>
            )}
            <ListItem component="button">
              <ListItemButton onClick={() => navigate('/')}>Home</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate('/profile')}>Profile</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate('/posts/trending')}>Trending</ListItemButton>
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
            <SearchBar />
          </AppBar>
          <Outlet />
        </div>
        <CreatePostModal />
      </div>
    </SearchContextProvider>
  );
};

export default MainLayout;
