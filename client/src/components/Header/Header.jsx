import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './header.css';

function Header() {
  const { isAuthenticated, user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to="/" className="logo">ProjectManager</Link>
      <nav>
        {!isAuthenticated && (
          <>
            <Link to="/login" className="header-action">Login</Link>
            <Link to="/register" className="header-action">Register</Link>
          </>
        )}
        {isAuthenticated && role === 'admin' && (
          <>
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : undefined}>Dashboard</NavLink>
            <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : undefined}>Users</NavLink>
            <NavLink to="/admin/projects" className={({ isActive }) => isActive ? 'active' : undefined}>Projects</NavLink>
            <NavLink to="/admin/tasks" className={({ isActive }) => isActive ? 'active' : undefined}>Tasks</NavLink>
            <NavLink to="/admin/notifications" className={({ isActive }) => isActive ? 'active' : undefined}>Notifications</NavLink>
            <Link to="/admin/profile" className="user-profile-link">
              {user?.name || user?.email}
            </Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
        {isAuthenticated && role === 'user' && (
          <>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : undefined}>Dashboard</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : undefined}>Projects</NavLink>
            <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : undefined}>Tasks</NavLink>
            <NavLink to="/notifications" className={({ isActive }) => isActive ? 'active' : undefined}>Notifications</NavLink>
            <Link to="/profile" className="user-profile-link">
              {user?.name || user?.email}
            </Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;