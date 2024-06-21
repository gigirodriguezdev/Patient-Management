import React from 'react';
import ReactDOM from 'react-dom';

export const Modal = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="modal-size relative bg-white p-6 rounded shadow-lg z-10">
        <button
          className="absolute top-0 right-0 m-2 text-gray-600"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
