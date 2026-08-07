import { create } from "zustand";

/** 客户端全局状态示例（替代原 Redux store 职责） */
export const useAppStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
