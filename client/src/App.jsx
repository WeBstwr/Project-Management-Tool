import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import "./assets/globals.css";
import Home from "./pages/Home/Home.jsx";
import Login from "./components/authentication/Login/Login";
import Register from "./components/authentication/Register/Register";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Project from "./pages/Project/Project";
import Task from "./pages/Task/Task";
import Notifications from "./pages/Notifications";
import AdminLayout from "./pages/admin/AdminLayout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers/AdminUsers";
import AdminProjects from "./pages/admin/AdminProjects/AdminProjects";
import AdminTasks from "./pages/admin/AdminTasks/AdminTasks";
import AdminNotifications from "./pages/admin/AdminNotifications/AdminNotifications";
import AdminProfile from "./pages/admin/AdminProfile/AdminProfile";
import useAuth from './hooks/useAuth';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { isAuthenticated, role } = useAuth();
  return isAuthenticated && role === 'admin' ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="main-content-with-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/projects" element={<PrivateRoute><Project /></PrivateRoute>} />
            <Route path="/tasks" element={<PrivateRoute><Task /></PrivateRoute>} />
            <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            {/* Admin Routes - Nested under /admin */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="tasks" element={<AdminTasks />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
