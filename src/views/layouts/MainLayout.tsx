import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar } from '@mui/material';

import '../views.css';
import CreatePostModal from '../../containers/CreatePostModal.tsx';
import { useContext, useEffect } from 'react';
import { userContext } from '../../contexts/UserContext.tsx';
import SearchBar from '../../components/SearchBar.tsx';
import { SearchContextProvider } from '../../contexts/SearchContext.tsx';
import SideBar from '../../containers/SideBar.tsx';

const MainLayout = () => {
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
        <SideBar />
        <div className="relative flex-grow pt-20 px-5">
          <AppBar position="fixed" className="p-2 sm:pl-40 !flex !justify-center">
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
