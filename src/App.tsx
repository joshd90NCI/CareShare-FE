import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './views/layouts/AuthLayout.tsx';
import MainLayout from './views/layouts/MainLayout.tsx';

import LoginContainer from './containers/LoginContainer.tsx';
import RegisterContainer from './containers/RegisterContainer.tsx';
import PostCollection from './containers/PostCollection.tsx';
import PostContainer from './containers/PostContainer.tsx';
import { ModalOpenContextProvider } from './contexts/ModalContext.tsx';
import { UserContextProvider } from './contexts/UserContext.tsx';

import './App.css';
import SearchResults from './containers/SearchResults.tsx';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ModalOpenContextProvider>
          <Routes>
            <Route>
              <Route element={<AuthLayout />}>
                <Route path="register" element={<RegisterContainer />} />
                <Route path="login" element={<LoginContainer />} />
              </Route>
              <Route path="/" element={<MainLayout />}>
                <Route path="posts" element={<PostCollection />} />
                <Route path="search" element={<SearchResults />} />
                <Route path="post/:id" element={<PostContainer />} />
              </Route>
            </Route>
          </Routes>
        </ModalOpenContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
