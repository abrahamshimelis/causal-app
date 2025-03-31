import React, { useEffect, useRef } from 'react';

const Dropdown = ({ onClose, onSelect }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full bg-white border shadow p-2 mt-1 z-10"
    >
      <div
        className="cursor-pointer hover:bg-gray-100 p-1"
        onClick={() => {
          onSelect('name 1');
          onClose();
        }}
      >
        name 1
      </div>
      <div
        className="cursor-pointer hover:bg-gray-100 p-1"
        onClick={() => {
          onSelect('name 2');
          onClose();
        }}
      >
        name 2
      </div>
    </div>
  );
};

export default Dropdown;
