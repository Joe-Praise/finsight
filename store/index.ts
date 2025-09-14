import { create } from 'zustand';

interface INavigationState {
  isOpen: boolean;
  isIcons: boolean;
  isHydrated: boolean;
  toggleSidebarIcons: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  initializeSidebar: (isMobile: boolean) => void;
}

// Helper functions for localStorage
const getPersistedState = () => {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem('navbar-storage');
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const setPersistedState = (state: { isOpen: boolean; isIcons: boolean }) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('navbar-storage', JSON.stringify(state));
  } catch {
    // Silently fail if localStorage is not available
  }
};

// Initialize with persisted state immediately to prevent flicker
const getInitialState = () => {
  const persistedState = getPersistedState();
  return {
    isOpen: persistedState?.isOpen ?? false, // Default to closed to prevent flash
    isIcons: persistedState?.isIcons ?? false,
    isHydrated: false,
  };
};

export const useNavBarStore = create<INavigationState>((set) => ({
  ...getInitialState(),
  
  toggleSidebarIcons: () => {
    set((state) => {
      const newState = { ...state, isIcons: !state.isIcons };
      setPersistedState({ isOpen: newState.isOpen, isIcons: newState.isIcons });
      return newState;
    });
  },
  
  toggleSidebar: () => {
    set((state) => {
      const newState = { ...state, isOpen: !state.isOpen };
      setPersistedState({ isOpen: newState.isOpen, isIcons: newState.isIcons });
      return newState;
    });
  },
  
  closeSidebar: () => {
    set((state) => {
      const newState = { ...state, isOpen: false };
      setPersistedState({ isOpen: newState.isOpen, isIcons: newState.isIcons });
      return newState;
    });
  },
  
  initializeSidebar: (isMobile: boolean) => {
    set((state) => {
      if (state.isHydrated) return state; // Already initialized
      
      const persistedState = getPersistedState();
      
      if (persistedState) {
        // Use persisted state if available
        const newState = {
          isOpen: persistedState.isOpen,
          isIcons: persistedState.isIcons,
          isHydrated: true,
        };
        return newState;
      } else {
        // Set defaults based on device type
        const defaultState = {
          isOpen: !isMobile, // Desktop: open, Mobile: closed
          isIcons: false,
          isHydrated: true,
        };
        setPersistedState({ isOpen: defaultState.isOpen, isIcons: defaultState.isIcons });
        return defaultState;
      }
    });
  },
}));
