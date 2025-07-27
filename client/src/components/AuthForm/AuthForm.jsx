import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './authForm.css';

function AuthForm({ mode = 'login' }) {
  const { login, register, isAuthenticated, role } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isLogin = mode === 'login';

  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true }); // Redirect to home instead of dashboard
      }
    }
  }, [isAuthenticated, role, navigate]);

  const formik = useFormik({
    initialValues: isLogin
      ? { email: '', password: '' }
      : { name: '', email: '', password: '' },
    onSubmit: (values) => {
      setError('');
      if (isLogin) {
        login(values);
        setTimeout(() => {
          if (!useAuth.getState().isAuthenticated) setError('Invalid credentials');
        }, 0);
      } else {
        const success = register(values);
        if (success) {
          navigate('/login', { replace: true });
        } else {
          setError('Registration failed (email may exist)');
        }
      }
    },
  });

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {!isLogin && (
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      
      {/* CTA for switching between login/register */}
      <div className="auth-switch">
        {isLogin ? (
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        ) : (
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthForm;