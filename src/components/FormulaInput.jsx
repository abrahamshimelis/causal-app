import React, { useState } from 'react';
import useFormulaStore from '../store/formulaStore';
import { useAutocomplete } from '../hooks/useAutocomplete';
import Tag from './Tag';

const FormulaInput = () => {
  const { tokens, addToken, deleteLastToken } = useFormulaStore();
  const [input, setInput] = useState('');

  const { data: suggestions = [] } = useAutocomplete(input);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      addToken({ type: 'tag', label: input });
      setInput('');
    } else if (e.key === 'Backspace' && input === '') {
      deleteLastToken();
    }
  };

  return (
    <div className="relative w-full max-w-3xl flex flex-wrap gap-2 border p-2 rounded shadow-sm">
      {tokens.map((token, index) => (
        <Tag key={index} token={token} />
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none flex-grow min-w-[150px]"
        placeholder="Enter the formula..."
      />

      {/* Suggestions dropdown */}
      {input && suggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-full max-w-3xl bg-white border rounded shadow z-10 max-h-64 overflow-auto">
          {suggestions.map((sug) => (
            <div
              key={sug.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                addToken({ type: 'tag', label: sug.name, value: sug.value });
                setInput('');
              }}
            >
              <div className="font-medium">{sug.name}</div>
              <div className="text-xs text-gray-500">{sug.category}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormulaInput;
