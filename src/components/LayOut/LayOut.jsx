import { Loader } from "components/Loader/Loader";
import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styleLayOut from './style.module.css'


export const LayOut = () => {
  return (
      <div className={styleLayOut.container}>
          <header className={styleLayOut.header}>
        <nav>
          <NavLink className={styleLayOut.navLink} to="/" end>
            Home
          </NavLink>
          <NavLink className={styleLayOut.navLink} to="/movies">Movies</NavLink>
        </nav>
      </header>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default LayOut