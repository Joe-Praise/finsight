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

// Initialize with safe defaults to prevent flicker on mobile
const getInitialState = () => {
  return {
    isOpen: false, // Always start closed to prevent mobile flash
    isIcons: false,
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
      
      if (isMobile) {
        // Mobile: ALWAYS start closed, ignore persisted state
        const mobileState = {
          isOpen: false,
          isIcons: false,
          isHydrated: true,
        };
        return mobileState;
      } else {
        // Desktop: Use persisted state or default to open
        const persistedState = getPersistedState();
        const desktopState = {
          isOpen: persistedState?.isOpen ?? true, // Default to open on desktop
          isIcons: persistedState?.isIcons ?? false,
          isHydrated: true,
        };
        setPersistedState({ isOpen: desktopState.isOpen, isIcons: desktopState.isIcons });
        return desktopState;
      }
    });
  },
}));
