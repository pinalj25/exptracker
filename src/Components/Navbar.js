import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Your Logo</Link>
      </div>
      <div className="nav-links">
        <NavLink to="/login"  >
          Login
        </NavLink>
        <NavLink to="/signup"  >
          Sign-up
        </NavLink>
        <NavLink to="/et"  >
          main
        </NavLink>
      </div>
      <div className="user-info">
        {user ? (
          <div>
            Welcome, {user.username}!{' '}
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div>
            Not logged in. {/* You can add login link here if needed */}
          </div>
        )}
      </div>
    </nav>
  );
}
