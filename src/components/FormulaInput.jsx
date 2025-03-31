import React, { useEffect, useState } from "react";
import useFormulaStore from "../store/formulaStore";
import { useAutocomplete } from "../hooks/useAutocomplete";
import Tag from "./Tag";
import {
  isValidOperator,
  isValidNumber,
  isAllowedCharacters,
} from "../utils/formulaValidation";

const FormulaInput = () => {
  const { tokens, addToken, deleteLastToken } = useFormulaStore();
  const [input, setInput] = useState("");
  const [suggestionInput, setSuggestionInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: suggestions = [] } = useAutocomplete(suggestionInput);

    useEffect(() => {
        setSuggestionInput(input)
    }, [input]);

  const handleInputChange = (e) => {
    const val = e.target.value;

    if (!isAllowedCharacters(val)) return;

    const lastChar = val[val.length - 1];
    const beforeLast = val.slice(0, -1).trim();

    if (isValidOperator(lastChar)) {
      // Save number before operand
      if (isValidNumber(beforeLast)) {
        addToken({ type: "number", label: beforeLast });
      } else if (beforeLast) {
        setInput(val);
        return;
      }

      addToken({ type: "operand", label: lastChar });

      // Trigger suggestions even if input is empty
      setInput("");
      setSuggestionInput("n")
      setShowSuggestions(true); // force show
      return;
    }

    // If user typed number then started typing a variable → save number
    if (input && isValidNumber(input) && !isValidNumber(val)) {
      addToken({ type: "number", label: input });
      setInput(val[val.length - 1]); // carry over last char
      return;
    }

    setInput(val);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    const trimmed = input.trim();

    if (e.key === "Enter" && trimmed) {
      addToken({ type: "tag", label: trimmed });
      setInput("");
    } else if (e.key === "Backspace" && input === "") {
      deleteLastToken();
    }
  };

  return (
    <div className="relative w-full max-w-3xl flex flex-wrap gap-2 border p-2 rounded shadow-sm">
      {tokens.map((token, index) => (
        <Tag key={index} token={token} index={index} />
      ))}
      <input
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="outline-none flex-grow min-w-[150px]"
        placeholder="Type here"
      />

      {/* Autocomplete Suggestions for tags only */}
      {(input || showSuggestions) &&
        !isValidNumber(input) &&
        !isValidOperator(input) &&
        suggestions.length > 0 && (
          <div className="absolute top-full left-0 mt-1 w-full max-w-3xl bg-white border rounded shadow z-10 max-h-64 overflow-auto">
            {suggestions.map((sug) => (
              <div
                key={sug.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  addToken({ type: "tag", label: sug.name, value: sug.value });
                  setInput("");
                  setShowSuggestions(false);
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
