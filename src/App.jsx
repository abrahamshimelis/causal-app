import React, { useEffect, useMemo }  from "react";
import FormulaInput from "./components/FormulaInput";
import useFormulaStore from "./store/formulaStore";
import { evaluateFormula } from './utils/evaluateFormula';

const App = () => {
  const tokens = useFormulaStore((state) => state.tokens);

  const result = useMemo(() => evaluateFormula(tokens), [tokens]);

  useEffect(() => {
    console.log("Current Tokens:", tokens);
  }, [tokens]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Formula Input</h1>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Result:</h2>
            <div className="mb-2 text-xl text-green-700">{result}</div>
          </div>
          <FormulaInput />
          
        </div>
      </div>
    </>
  );
};

export default App;
