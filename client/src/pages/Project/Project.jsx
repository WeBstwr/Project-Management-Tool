import React, { useState } from 'react';
import useProjectStore from '../../store/projectStore';
import useTaskStore from '../../store/taskStore';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import TaskCard from '../../components/TaskCard/TaskCard';
import Modal from '../../components/Modal/Modal';
import './project.css';

const STATUS_OPTIONS = ['todo', 'in progress', 'done'];

function Project() {
  const { projects, addProject, removeProject } = useProjectStore();
  const { tasks, addTask, removeTask, updateTask } = useTaskStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', members: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: '', status: 'todo', assignee: '' });

  // For comments (simple in-memory, per task)
  const [commentForms, setCommentForms] = useState({}); // { [taskId]: commentText }
  const [comments, setComments] = useState({}); // { [taskId]: [{author, text}] }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addProject({
      name: form.name,
      description: form.description,
      members: form.members.split(',').map(m => m.trim()).filter(Boolean),
    });
    setForm({ name: '', description: '', members: '' });
    setShowForm(false);
  };

  // --- Modal logic ---
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setStatusFilter('all');
    setAssigneeFilter('all');
    setShowTaskForm(false);
  };
  const closeProjectModal = () => setSelectedProject(null);

  // --- Task Form logic ---
  const handleTaskFormChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;
    
    addTask({
      projectId: selectedProject.id,
      title: taskForm.title,
      status: taskForm.status,
      assignee: taskForm.assignee || '',
    });
    
    // Reset form and close
    setTaskForm({ title: '', status: 'todo', assignee: '' });
    setShowTaskForm(false);
  };

  const handleToggleTask = (task) => {
    updateTask(task.id, {
      status: task.status === 'done' ? 'todo' : 'done',
    });
  };

  // --- Task Assignee logic ---
  const handleAssignTask = (task, assignee) => {
    updateTask(task.id, { assignee });
  };

  // --- Status/Assignee Filter logic ---
  const getFilteredTasks = (projectId) => {
    let filtered = tasks.filter(t => t.projectId === projectId);
    if (statusFilter !== 'all') filtered = filtered.filter(t => t.status === statusFilter);
    if (assigneeFilter !== 'all') filtered = filtered.filter(t => t.assignee === assigneeFilter);
    return filtered;
  };

  // --- Comments logic ---
  const handleCommentInput = (taskId, value) => {
    setCommentForms((prev) => ({ ...prev, [taskId]: value }));
  };
  const handleAddComment = (taskId) => {
    const text = commentForms[taskId]?.trim();
    if (!text) return;
    setComments((prev) => ({
      ...prev,
      [taskId]: [...(prev[taskId] || []), { author: 'You', text }],
    }));
    setCommentForms((prev) => ({ ...prev, [taskId]: '' }));
  };

  return (
    <div className="project-board">
      <div className="project-board-header">
        <span className="project-board-title">Your Projects</span>
        <button className="add-project-btn" onClick={() => setShowForm(v => !v)}>
          {showForm ? 'Cancel' : 'Add Project'}
        </button>
      </div>
      {showForm && (
        <form className="add-project-form" onSubmit={handleAddProject}>
          <input
            name="name"
            type="text"
            placeholder="Project Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={form.description}
            onChange={handleChange}
            rows={2}
          />
          <input
            name="members"
            type="text"
            placeholder="Members (comma separated)"
            value={form.members}
            onChange={handleChange}
          />
          <button type="submit">Create Project</button>
        </form>
      )}
      <div className="project-list">
        {projects.length === 0 ? (
          <div>No projects yet. Click "Add Project" to create one!</div>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => openProjectModal(project)}
            />
          ))
        )}
      </div>

      {/* Project Details Modal */}
      <Modal isOpen={!!selectedProject} onClose={closeProjectModal}>
        {selectedProject && (
          <div>
            <ProjectCard project={selectedProject} />
            <div style={{ margin: '2rem 0 1rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <strong>Tasks</strong>
                <button 
                  className="add-project-btn" 
                  onClick={() => setShowTaskForm(v => !v)}
                  style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}
                >
                  {showTaskForm ? 'Cancel' : 'Add Task'}
                </button>
              </div>

              {/* Task Creation Form */}
              {showTaskForm && (
                <form className="add-task-form" onSubmit={handleAddTask} style={{ marginBottom: '1rem' }}>
                  <input
                    name="title"
                    type="text"
                    placeholder="Task title"
                    value={taskForm.title}
                    onChange={handleTaskFormChange}
                    required
                  />
                  <select
                    name="status"
                    value={taskForm.status}
                    onChange={handleTaskFormChange}
                    style={{ padding: '0.7rem 1rem', border: '1.5px solid var(--second-color)', borderRadius: '6px' }}
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                  <select
                    name="assignee"
                    value={taskForm.assignee}
                    onChange={handleTaskFormChange}
                    style={{ padding: '0.7rem 1rem', border: '1.5px solid var(--second-color)', borderRadius: '6px' }}
                  >
                    <option value="">Unassigned</option>
                    {selectedProject.members && selectedProject.members.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                  <button type="submit">Create Task</button>
                </form>
              )}

              {/* Filters */}
              <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <label>Status:</label>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="all">All</option>
                  {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
                </select>
                <label>Assignee:</label>
                <select value={assigneeFilter} onChange={e => setAssigneeFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="">Unassigned</option>
                  {selectedProject.members && selectedProject.members.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Task List */}
              <div className="task-list">
                {getFilteredTasks(selectedProject.id).length === 0 ? (
                  <div style={{ color: '#888', fontSize: '1rem' }}>No tasks yet.</div>
                ) : (
                  getFilteredTasks(selectedProject.id).map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={() => handleToggleTask(task)}
                      onRemove={() => removeTask(task.id)}
                      onAssign={() => {
                        // Simple assign: cycle through members
                        const members = selectedProject.members || [];
                        if (members.length === 0) return;
                        const idx = members.indexOf(task.assignee);
                        const next = members[(idx + 1) % members.length];
                        handleAssignTask(task, next);
                      }}
                    >
                      {/* Comments Section */}
                      <div style={{ marginTop: '1rem' }}>
                        <strong>Comments</strong>
                        <div style={{ margin: '0.5rem 0' }}>
                          {(comments[task.id] || []).map((comment, i) => (
                            <div key={i} style={{ marginBottom: '0.3rem', fontSize: '1rem', color: '#333' }}>
                              <span style={{ fontWeight: 600 }}>{comment.author}:</span> {comment.text}
                            </div>
                          ))}
                        </div>
                        <form style={{ display: 'flex', gap: '0.5rem' }} onSubmit={e => { e.preventDefault(); handleAddComment(task.id); }}>
                          <input
                            type="text"
                            placeholder="Add a comment"
                            value={commentForms[task.id] || ''}
                            onChange={e => handleCommentInput(task.id, e.target.value)}
                          />
                          <button type="submit">Post</button>
                        </form>
                      </div>
                    </TaskCard>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Project;