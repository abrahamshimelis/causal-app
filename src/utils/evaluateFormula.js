export const evaluateFormula = (tokens) => {
    if (!tokens || tokens.length === 0) return '';
  
    try {
      const expression = tokens
        .map((token) => {
          if (token.type === 'number' || token.type === 'operand') {
            return token.label;
          }
  
          if (token.type === 'tag') {
            return token.value;
          }
  
          return '';
        })
        .join(' ');
  
      // Safe evaluation
      const result = new Function(`return ${expression}`)();
      return result;
    } catch (err) {
      return 'Invalid formula';
    }
  };
  