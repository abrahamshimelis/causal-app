import React, { useState } from 'react';
import Dropdown from './Dropdown';
import useFormulaStore from '../store/formulaStore';

const Tag = ({ token, index }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { updateToken } = useFormulaStore();

  const handleSelect = (newLabel) => {
    updateToken(index, { label: newLabel });
  };

  const tagClass = {
    tag: 'bg-gray-200 text-blue-800 px-2',
    number: 'p-0',
    operand: 'p-0',
  }[token.type] || 'bg-gray-100';

  return (
    <div
      className={`relative flex items-center py-1 rounded ${tagClass}`}
    >
      <span>{token.label}</span>
      {token.type === 'tag' && (
        <button
          className="ml-1 text-xs"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          ▼
        </button>
      )}
      {showDropdown && (
        <Dropdown
          onClose={() => setShowDropdown(false)}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default Tag;
