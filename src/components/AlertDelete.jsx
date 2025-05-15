import React from 'react';

const DeleteAlert = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className=" rounded-xl shadow-lg w-80 text-center">
        <div className="p-6">
          <h3 className="text-lg font-medium">Are you sure you want to delete?</h3>
        </div>
        <div className="border-t grid grid-cols-2 divide-x text-sm font-medium">
          <button
            onClick={onConfirm}
            className="py-3 text-red-400 hover:text-red-600"
          >
            Yes, I'm sure
          </button>
          <button
            onClick={onCancel}
            className="py-3 text-blue-500 hover:text-blue-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
