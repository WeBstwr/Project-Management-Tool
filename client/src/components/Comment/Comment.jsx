import React from 'react';
import './comment.css';

function Comment({ comment, children }) {
  if (!comment) return null;
  return (
    <div className="comment">
      <div className="comment-author">{comment.author}</div>
      <div className="comment-text">{comment.text}</div>
      {children}
    </div>
  );
}

export default Comment;