import React from 'react';
import './taskCard.css';

function TaskCard({ task, onToggle, onRemove, onAssign, children }) {
  if (!task) return null;
  return (
    <div className="task-card">
      <div className="task-info">
        <span className="task-title">{task.title}</span>
        <span className="task-meta">
          Status:<span className="task-status"> {task.status}</span>
        </span>
        <span className="task-meta">
          Assignee: <span className="task-status">{task.assignee || 'Unassigned'}</span>
        </span>
      </div>
      <div className="task-actions">
        {onToggle && (
          <button className="task-btn" onClick={onToggle}>
            {task.status === 'done' ? 'Mark as Todo' : 'Mark as Done'}
          </button>
        )}
        {onRemove && (
          <button className="task-btn" style={{ background: 'var(--fourth-color)' }} onClick={onRemove}>
            Remove
          </button>
        )}
        {onAssign && (
          <button className="task-btn" onClick={onAssign}>
            Assign
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export default TaskCard;