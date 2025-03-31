import React, { useState } from 'react';
import useFormulaStore from '../store/formulaStore';
import { useAutocomplete } from '../hooks/useAutocomplete';
import Tag from './Tag';

const FormulaInput = () => {
  const { tokens, addToken, deleteLastToken } = useFormulaStore();
  const [input, setInput] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

//   const { data: suggestions } = useAutocomplete(input);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      addToken({ type: 'tag', label: input });
      setInput('');
    } else if (e.key === 'Backspace' && input === '') {
      deleteLastToken();
    }
  };

  const handleOperand = (operand) => {
    addToken({ type: 'operand', label: operand });
  };

  return (
    <div className="flex gap-2 border p-2 flex-wrap">
      {tokens.map((token, index) => (
        <Tag key={index} token={token} />
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none"
        placeholder="Enter the formula..."
      />
      {/* Suggestions dropdown */}
      {/* {suggestions?.length > 0 && (
        <div className="absolute bg-white shadow p-2 rounded">
          {suggestions.map((sug) => (
            <div
              key={sug}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                addToken({ type: 'tag', label: sug });
                setInput('');
              }}
            >
              {sug}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default FormulaInput;
