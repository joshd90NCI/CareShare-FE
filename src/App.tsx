import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import AuthLayout from './views/layouts/AuthLayout.tsx';
import LoginContainer from './containers/LoginContainer.tsx';
import RegisterContainer from './containers/RegisterContainer.tsx';
import MainLayout from './views/layouts/MainLayout.tsx';
import PostCollection from './containers/PostCollection.tsx';
import PostContainer from './containers/PostContainer.tsx';
import { ModalOpenContextProvider } from './contexts/UserContext.tsx';

function App() {
  return (
    <BrowserRouter>
      <ModalOpenContextProvider>
        <Routes>
          <Route>
            <Route element={<AuthLayout />}>
              <Route path="register" element={<RegisterContainer />} />
              <Route path="login" element={<LoginContainer />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="posts" element={<PostCollection />} />
              <Route path="post/:id" element={<PostContainer />} />
            </Route>
          </Route>
        </Routes>
      </ModalOpenContextProvider>
    </BrowserRouter>
  );
}

export default App;
