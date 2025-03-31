const VALID_OPERATORS = ['+', '-', '*', '/', '^', '(', ')'];

export const isValidOperator = (value) => {
  return VALID_OPERATORS.includes(value.trim());
};

export const isValidNumber = (value) => {
  return /^\d+$/.test(value); // Only natural numbers (no negative or decimal)
};

export const isValidVariable = (value) => {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value); // Optional: alphanumeric + underscore, starting with a letter
};

export const isAllowedCharacters = (value) => {
  return /^[0-9a-zA-Z+\-*/^() ]*$/.test(value); // for real-time input filtering
};
