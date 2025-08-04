import React from 'react';
import { Link } from 'react-router-dom';
import useProjectStore from '../../store/projectStore';
import useTaskStore from '../../store/taskStore';
import useAuth from '../../hooks/useAuth';
import './dashboard.css';

function Dashboard() {
  const { projects } = useProjectStore();
  const { tasks } = useTaskStore();
  const { user } = useAuth();

  // Calculate stats
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const userTasks = tasks.filter(task => task.assignee === (user?.name || user?.email));

  // Mock recent activity (in a real app, this would come from a store)
  const recentActivity = [
    { id: 1, text: 'Task "Design homepage" was assigned to you', time: '2 hours ago' },
    { id: 2, text: 'Project "Website Redesign" was updated', time: '4 hours ago' },
    { id: 3, text: 'Task "Write API docs" was marked as done', time: '1 day ago' },
  ];

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome back, {user?.name || user?.email}!
        </h1>
        <p className="dashboard-subtitle">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{totalProjects}</div>
            <div className="stat-label">Total Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completedTasks}</div>
            <div className="stat-label">Completed Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{userTasks.length}</div>
            <div className="stat-label">Your Tasks</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/projects" className="action-btn">
            View All Projects
          </Link>
          <Link to="/tasks" className="action-btn">
            View My Tasks
          </Link>
          <Link to="/notifications" className="action-btn">
            Check Notifications
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div>{activity.text}</div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;