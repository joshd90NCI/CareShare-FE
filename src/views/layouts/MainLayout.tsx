import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar } from '@mui/material';

import '../views.css';
import CreatePostModal from '../../containers/CreatePostModal.tsx';
import { useContext, useEffect } from 'react';
import { userContext } from '../../contexts/UserContext.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import { SearchContextProvider } from '../../contexts/SearchContext.tsx';
import SideBar from '../../containers/SideBar.tsx';

// Our primary layout.  Contains nav and sidebar
const MainLayout = () => {
  const { userDetails } = useContext(userContext);
  const navigate = useNavigate();

  // If we are not logged in, kick the user back out to the login page and keep our routes pseudo protected
  useEffect(() => {
    if (!userDetails) {
      navigate('/login');
    }
  }, [userDetails, navigate]);

  // Wrap our layout in the search context provider
  return (
    <SearchContextProvider>
      <div className="flex main-bg h-dvh overflow-auto">
        {/*SideBar*/}
        <SideBar />
        <div className="relative flex-grow pt-20 px-5">
          {/*Navbar*/}
          <AppBar
            position="fixed"
            className="p-2 sm:pl-40 !flex !justify-center"
            sx={{
              backgroundColor: 'secondary.main',
            }}
          >
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
