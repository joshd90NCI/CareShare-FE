import { useState } from 'react';
import { Button, Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import SideNavList from './SideNavList.tsx';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ChevronLeft } from '@mui/icons-material';

const SideBar = () => {
  const [openForMobile, setOpenForMobile] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setOpenForMobile((prev) => !prev);
  };

  return (
    <div className={isMobile ? 'w-0' : ''}>
      <Toolbar>
        <Button>Logo</Button>
      </Toolbar>

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
      </Drawer>
    </div>
  );
};

export default SideBar;
