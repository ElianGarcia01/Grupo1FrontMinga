import React from 'react';

const SaveAlert = ({onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="rounded-xl shadow-lg w-80 text-center p-6">
        <h3 className="text-lg font-medium mb-4">Your changes are saved correctly</h3>
        <button
          onClick={onClose}
          className="text-blue-600 font-semibold hover:underline"
        >
          Acept
        </button>
      </div>
    </div>
  );
};

export default SaveAlert;
