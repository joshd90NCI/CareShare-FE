import { useContext, useState } from 'react';
import { Button, Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import SideNavList from './SideNavList.tsx';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ChevronLeft } from '@mui/icons-material';

import { userContext } from '../contexts/UserContext.tsx';

//Sidebar as part of layout
const SideBar = () => {
  const [openForMobile, setOpenForMobile] = useState(false);
  const { setUserDetails } = useContext(userContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // On mobile this is expandable and collapsible
  const handleDrawerToggle = () => {
    setOpenForMobile((prev) => !prev);
  };

  // We set our user context to null which will in turn wipe the token from our session storage
  const handleLogout = () => {
    setUserDetails(null);
  };

  return (
    <div className={isMobile ? 'w-0' : ''}>
      <Toolbar>
        <Button>Logo</Button>
      </Toolbar>
      {/*Collapsible if we are in mobile mode*/}
      {isMobile && !openForMobile && (
        <div className="text-6xl text-stone-500">
          <ChevronRightIcon
            color="inherit"
            onClick={handleDrawerToggle}
            className="z-20 relative"
            fontSize="inherit"
          />
        </div>
      )}
      {/* Sidebar for Desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: '240px',
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box', paddingTop: '40px' },
          }}
        >
          <SideNavList />
          <div className="w-full px-3">
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                backgroundColor: 'secondary.main',
                position: 'absolute',
                bottom: '1rem',
                width: '90%',
              }}
            >
              Logout
            </Button>
          </div>
        </Drawer>
      )}

      {/* Sidebar for Mobile */}
      <Drawer
        variant="temporary"
        open={openForMobile}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box', paddingTop: '40px' },
        }}
      >
        <div className="text-6xl text-stone-500" onClick={handleDrawerToggle}>
          <ChevronLeft fontSize="inherit" />
        </div>
        <SideNavList />
        <div className="w-full px-3">
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: 'secondary.main',
              position: 'absolute',
              bottom: '1rem',
              width: '90%',
            }}
          >
            Logout
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
