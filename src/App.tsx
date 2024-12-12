import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ModalOpenContextProvider } from './contexts/ModalContext.tsx';
import { UserContextProvider } from './contexts/UserContext.tsx';
import { AlertProvider } from './contexts/AlertContext.tsx';

import './App.css';
// had code splitting here through lazy load however as the site is quite light, loading all at once actually leads
// to a better overall experience
import AuthLayout from './views/layouts/AuthLayout.tsx';
import RegisterPage from './views/RegisterPage.tsx';
import LoginPage from './views/LoginPage.tsx';
import MainLayout from './views/layouts/MainLayout.tsx';
import LandingPage from './views/LandingPage.tsx';
import SearchResults from './containers/SearchResults.tsx';
import PostCollection from './containers/PostCollection.tsx';
import PostContainer from './containers/PostContainer.tsx';
import ProfilePage from './views/ProfilePage.tsx';
import AdminPage from './views/AdminPage.tsx';

// Handle our routing at this point
function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ModalOpenContextProvider>
          <AlertProvider>
            <Routes>
              <Route>
                {/*Nested Routing of Auth routes*/}
                <Route element={<AuthLayout />}>
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="login" element={<LoginPage />} />
                </Route>
                {/*Nested Routing of Main Routes*/}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="search" element={<SearchResults />} />
                  <Route path="posts/:type" element={<PostCollection />} />
                  <Route path="post/:id" element={<PostContainer />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="/admin">
                    <Route index element={<AdminPage />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </AlertProvider>
        </ModalOpenContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
