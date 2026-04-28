import React from 'react';

export default function Modal({ id, show, onClose, title, children, footer }) {
  return (
    <div
      className={`modal-overlay ${show ? 'show' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        <div className="modal-header">
          <h3>{title}</h3>
          <span className="modal-close" onClick={onClose}>✕</span>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
      
    </div>
  );
}
