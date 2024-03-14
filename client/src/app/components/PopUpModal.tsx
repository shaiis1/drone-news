import React from 'react';
import '../styles/PopUpModal.css';

interface PopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const PopUpModal: React.FC<PopUpModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button className="close-modal" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
