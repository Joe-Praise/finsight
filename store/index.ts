import { create } from 'zustand';

interface INavigationState {
  isOpen: boolean;
  isIcons: boolean;
  toggleSidebarIcons: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const useNavBarStore = create<INavigationState>((set) => ({
  isOpen: false,
  isIcons: false,
  toggleSidebarIcons: () => set((state) => ({ isIcons: !state.isIcons })),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
}));
