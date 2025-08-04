import React, { useState } from 'react';
import useProjectStore from '../../store/projectStore';
import './project.css';

function Project() {
  const { projects, addProject, removeProject } = useProjectStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', members: '' });

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
            <div className="project-card" key={project.id}>
              <div className="project-card-title">{project.name}</div>
              <div className="project-card-desc">{project.description}</div>
              <div className="project-card-members">
                Members: {project.members && project.members.length > 0 ? project.members.join(', ') : 'None'}
              </div>
              <button className="add-project-btn" onClick={() => removeProject(project.id)} style={{ marginTop: '1rem', background: 'var(--fourth-color)' }}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Project;