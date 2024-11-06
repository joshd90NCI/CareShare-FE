import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
      <Dialog open={false} onClose={() => console.log('closing')}>
        <DialogContent>
          <h3>Create Post</h3>
          <TextField
            autoFocus
            margin="normal"
            label="Post Title"
            fullWidth
            variant="outlined"
            type="text"
          />
          <TextField
            autoFocus
            margin="normal"
            label="Post Content"
            fullWidth
            variant="outlined"
            type="text"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => console.log('close')} color="secondary">
            Close
          </Button>
          <Button onClick={() => console.log('saving')} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainLayout;
