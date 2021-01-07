import { NavLink } from 'react-router-dom';
import './index.css';

function Nav() {
  return (
    <nav className="Nav">
      <NavLink exact to="/">Home</NavLink>
      {/* The user is set to a default for the static client */}
      <NavLink to="/user/1">Account</NavLink>
    </nav>
  );
}

export default Nav;