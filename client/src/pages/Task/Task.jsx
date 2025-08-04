import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTaskStore from '../../store/taskStore';
import useProjectStore from '../../store/projectStore';
import useAuth from '../../hooks/useAuth';
import TaskCard from '../../components/TaskCard/TaskCard';
import './task.css';

const STATUS_OPTIONS = ['all', 'todo', 'in progress', 'done'];

function Task() {
    const { tasks, updateTask, removeTask } = useTaskStore();
    const { projects } = useProjectStore();
    const { user } = useAuth();
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('project');

    // Get current user's tasks with project information
    const userTasks = tasks
        .filter(task => task.assignee === (user?.name || user?.email))
        .map(task => {
            const project = projects.find(p => p.id === task.projectId);
            return {
                ...task,
                projectName: project?.name || 'Unknown Project'
            };
        });

    // Filter and sort tasks
    const filteredTasks = userTasks
        .filter(task => statusFilter === 'all' || task.status === statusFilter)
        .sort((a, b) => {
            switch (sortBy) {
                case 'project':
                    return a.projectName.localeCompare(b.projectName);
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    const handleToggleTask = (task) => {
        updateTask(task.id, {
            status: task.status === 'done' ? 'todo' : 'done',
        });
    };

    const handleRemoveTask = (taskId) => {
        removeTask(taskId);
    };

    return (
        <div className="task-page">
            <div className="task-header">
                <h1 className="task-title">My Tasks</h1>
                <p className="task-subtitle">
                    All tasks assigned to you across all projects
                </p>
            </div>

            {/* Filters and Sorting */}
            <div className="task-controls">
                <div className="filter-section">
                    <label>Status:</label>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        {STATUS_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>
                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="sort-section">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value="project">Project</option>
                        <option value="status">Status</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>

            {/* Task Stats */}
            <div className="task-stats">
                <div className="stat">
                    <span className="stat-number">{userTasks.length}</span>
                    <span className="stat-label">Total Tasks</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{userTasks.filter(t => t.status === 'todo').length}</span>
                    <span className="stat-label">To Do</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{userTasks.filter(t => t.status === 'in progress').length}</span>
                    <span className="stat-label">In Progress</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{userTasks.filter(t => t.status === 'done').length}</span>
                    <span className="stat-label">Completed</span>
                </div>
            </div>

            {/* Task List */}
            <div className="task-list">
                {filteredTasks.length === 0 ? (
                    <div className="no-tasks">
                        <h3>No tasks found</h3>
                        <p>
                            {userTasks.length === 0
                                ? "You don't have any tasks assigned yet."
                                : "No tasks match your current filters."}
                        </p>
                        <Link to="/projects" className="action-btn">
                            View Projects
                        </Link>
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <div key={task.id} className="task-item">
                            <div className="task-project">
                                <span className="project-badge">{task.projectName}</span>
                            </div>
                            <TaskCard
                                task={task}
                                onToggle={() => handleToggleTask(task)}
                                onRemove={() => handleRemoveTask(task.id)}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Task;
