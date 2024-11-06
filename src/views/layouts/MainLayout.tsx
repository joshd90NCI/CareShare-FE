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

const MainLayout = () => {
  return (
    <div className="flex main-bg h-dvh">
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
            <Button variant="contained">Ask Question</Button>
          </ListItem>
        </List>
      </Drawer>
      <div className="relative flex-grow">
        <AppBar position="absolute" className="p-2 !flex !justify-center">
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
    </div>
  );
};

export default MainLayout;
