import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import AuthLayout from './views/layouts/AuthLayout.tsx';
import LoginContainer from './containers/LoginContainer.tsx';
import RegisterContainer from './containers/RegisterContainer.tsx';
import MainLayout from './views/layouts/MainLayout.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={<AuthLayout />}>
            <Route path="register" element={<RegisterContainer />} />
            <Route path="login" element={<LoginContainer />} />
          </Route>
          <Route path="/" element={<MainLayout />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
