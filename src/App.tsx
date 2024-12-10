import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { ModalOpenContextProvider } from './contexts/ModalContext.tsx';
import { UserContextProvider } from './contexts/UserContext.tsx';
import { AlertProvider } from './contexts/AlertContext.tsx';

import './App.css';

// Lazy load components
const AuthLayout = lazy(() => import('./views/layouts/AuthLayout.tsx'));
const MainLayout = lazy(() => import('./views/layouts/MainLayout.tsx'));
const LoginPage = lazy(() => import('./views/LoginPage.tsx'));
const RegisterPage = lazy(() => import('./views/RegisterPage.tsx'));
const PostCollection = lazy(() => import('./containers/PostCollection.tsx'));
const PostContainer = lazy(() => import('./containers/PostContainer.tsx'));
const SearchResults = lazy(() => import('./containers/SearchResults.tsx'));
const ProfilePage = lazy(() => import('./views/ProfilePage.tsx'));
const AdminPage = lazy(() => import('./views/AdminPage.tsx'));
const LandingPage = lazy(() => import('./views/LandingPage.tsx'));

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ModalOpenContextProvider>
          <AlertProvider>
            {/* Suspense fallback ensures smooth loading */}
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route>
                  <Route element={<AuthLayout />}>
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                  </Route>
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
            </Suspense>
          </AlertProvider>
        </ModalOpenContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
