import { NavLink } from 'react-router-dom';
import './index.css';

function Nav() {
  return (
    <nav className="Nav">
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/account">Account</NavLink>
    </nav>
  );
}

export default Nav;