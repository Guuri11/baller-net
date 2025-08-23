import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingState {
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (seen: boolean) => void;
  loadOnboarding: () => Promise<void>;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  hasSeenOnboarding: false,
  setHasSeenOnboarding: (seen) => {
    set({ hasSeenOnboarding: seen });
    AsyncStorage.setItem('hasSeenOnboarding', seen ? '1' : '0');
  },
  loadOnboarding: async () => {
    const value = await AsyncStorage.getItem('hasSeenOnboarding');
    set({ hasSeenOnboarding: value === '1' });
  },
}));
