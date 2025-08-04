import React from 'react';
import './projectCard.css';

function ProjectCard({ project, onClick, children }) {
  if (!project) return null;
  return (
    <div className="project-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="project-card-title">{project.name}</div>
      <div className="project-card-desc">{project.description}</div>
      <div className="project-card-members">
        Members: {project.members && project.members.length > 0 ? project.members.join(', ') : 'None'}
      </div>
      {children}
    </div>
  );
}

export default ProjectCard;