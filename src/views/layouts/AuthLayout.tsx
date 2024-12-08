import { Outlet } from 'react-router-dom';
import logo from '../../assets/careshare-logo.png';

import '../views.css';

const AuthLayout = () => {
  return (
    <section className="w-full h-dvh flex items-center justify-center flex-col main-bg relative">
      <h1 className="absolute top-10 text-4xl text-center">Welcome to Care Share</h1>
      <img
        src={logo}
        alt="Care Share Logo"
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 logo-slide-up w-48 h-48"
      />
      <Outlet />
    </section>
  );
};
export default AuthLayout;
