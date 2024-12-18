import { useContext } from 'react';
import { userContext } from '../contexts/UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import { modalOpenContext } from '../contexts/ModalContext.tsx';
import { Button, List, ListItem, ListItemButton } from '@mui/material';

// The list of items that are available in the side navbar
const SideNavList = () => {
  const { userDetails } = useContext(userContext);
  const navigate = useNavigate();
  const { setModalDetails } = useContext(modalOpenContext);

  if (!userDetails) return null;

  return (
    <List>
      {userDetails && (
        <p className="text-center bg-bone bg-opacity-70 p-3 rounded-lg m-2">
          Signed in as{' '}
          <b>
            {userDetails?.fName} {userDetails?.lName}
          </b>
        </p>
      )}
      {/*Admin section only visible if you have moderator or admin role*/}
      {(userDetails?.roles?.includes('ADMIN') || userDetails?.roles?.includes('MODERATOR')) && (
        <ListItem>
          <ListItemButton
            onClick={() => navigate('/admin')}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Admin
          </ListItemButton>
        </ListItem>
      )}
      <ListItem component="button">
        <ListItemButton
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Home
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={() => navigate('/profile')}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Profile
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={() => navigate('/posts/trending')}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Trending
        </ListItemButton>
      </ListItem>
      <ListItem>
        <Button
          variant="contained"
          onClick={() => setModalDetails({ openState: true })}
          className="w-full"
        >
          Ask Question
        </Button>
      </ListItem>
    </List>
  );
};

export default SideNavList;
