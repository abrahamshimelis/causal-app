import { create } from 'zustand';

const useFormulaStore = create((set) => ({
  tokens: [],
  setTokens: (tokens) => set({ tokens }),
  addToken: (token) => set((state) => ({ tokens: [...state.tokens, token] })),
  deleteLastToken: () =>
    set((state) => ({ tokens: state.tokens.slice(0, -1) })),
}));

export default useFormulaStore;
