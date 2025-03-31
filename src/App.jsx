import React from 'react';
import FormulaInput from './components/FormulaInput';

const App = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Formula Input</h1>
        <FormulaInput />
      </div>
    </div>
    </>
  );
};

export default App;
