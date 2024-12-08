import { Outlet } from 'react-router-dom';
import logo from '../../assets/careshare-logo.png';

import '../views.css';

const AuthLayout = () => {
  return (
    <section className="w-full h-dvh flex items-center justify-center flex-col main-bg relative">
      <h1 className="absolute top-10 text-4xl">Welcome to Care Share</h1>
      <img src={logo} alt="Care Share Logo" className="w-48 mb-8" />
      <Outlet />
    </section>
  );
};
export default AuthLayout;
