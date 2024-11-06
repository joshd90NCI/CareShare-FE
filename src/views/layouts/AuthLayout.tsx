import { Outlet } from 'react-router-dom';

import '../views.css';

const AuthLayout = () => {
  return (
    <section className="w-full h-dvh flex items-center justify-center flex-col main-bg relative">
      <h1 className="absolute top-10 text-4xl">Welcome to Care Share</h1>
      <Outlet />
    </section>
  );
};
export default AuthLayout;
