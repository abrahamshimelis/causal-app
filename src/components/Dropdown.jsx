import React from 'react';

const Dropdown = ({ onClose }) => {
  return (
    <div className="absolute right-0 top-full bg-white border shadow p-2 mt-1 z-10">
      <div className="cursor-pointer hover:bg-gray-100 p-1" onClick={onClose}>
        Option 1
      </div>
      <div className="cursor-pointer hover:bg-gray-100 p-1" onClick={onClose}>
        Option 2
      </div>
    </div>
  );
};

export default Dropdown;
