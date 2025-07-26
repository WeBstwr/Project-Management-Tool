import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/projects">Projects</Link>
            <Link to="/admin/tasks">Tasks</Link>
            <Link to="/admin/notifications">Notifications</Link>
            <Link to="/admin/profile" className="user-profile-link">
              {user?.name || user?.email}
            </Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
        {isAuthenticated && role === 'user' && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/notifications">Notifications</Link>
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