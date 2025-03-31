const dummyValues = {
    revenue: 1000,
    cost: 300,
  };
  
  export const evaluateFormula = (tokens) => {
    try {
      const expr = tokens
        .map((t) => {
          if (t.type === 'operand') return t.label;
          if (t.type === 'tag') return dummyValues[t.label] ?? 0;
          return '';
        })
        .join('');
      // Evaluate using Function constructor (safe only for trusted input)
      return new Function(`return ${expr}`)();
    } catch {
      return 'Invalid Expression';
    }
  };
  