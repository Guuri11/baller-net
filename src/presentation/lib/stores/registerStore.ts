import { PlayerPosition } from '@domain/player/value-objects';
import { create } from 'zustand';

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}


interface RegisterPersonalData {
  gender: string;
  birthday: Date;
  username: string;
}


interface RegisterPhysicalData {
  heightCm: number;
  weightKg: number;
}


interface RegisterCareerData {
  position: PlayerPosition;
  team?: string;
  league?: string;
  pointsPerGame: number;
  assistsPerGame: number;
  reboundsPerGame: number;
  blocksPerGame: number;
  stealsPerGame: number;
}

interface RegisterState {
  user?: RegisterUserData;
  personal?: RegisterPersonalData;
  physical?: RegisterPhysicalData;
  career?: RegisterCareerData;
  setUser: (user: RegisterUserData) => void;
  setPersonal: (personal: RegisterPersonalData) => void;
  setPhysical: (physical: RegisterPhysicalData) => void;
  setCareer: (career: RegisterCareerData) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  user: undefined,
  personal: undefined,
  physical: undefined,
  career: undefined,
  setUser: (user) => set({ user }),
  setPersonal: (personal) => set({ personal }),
  setPhysical: (physical) => set({ physical }),
  setCareer: (career) => set({ career }),
}));
