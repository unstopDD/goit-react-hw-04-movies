import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigations() {
  return (
    <nav>
      <NavLink to="/" exact className={s.link} activeClassName={s.activeLink}>
        Home
      </NavLink>
      <NavLink to="/Movies" className={s.link} activeClassName={s.activeLink}>
        Movies
      </NavLink>
      <hr />
    </nav>
  );
}
