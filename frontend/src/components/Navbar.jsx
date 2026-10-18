
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <NavLink
        to="/home"
        end
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        Pastes
      </NavLink>

      <div className="navbar-user">
        {user?.name && <span>{user.name}</span>}

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
