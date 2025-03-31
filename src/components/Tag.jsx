import React from 'react';


const Tag = ({ token }) => {
  return (
    <div className="relative flex items-center px-1 py-1">
      <span>{token.label}</span>
    </div>
  );
};

export default Tag;
