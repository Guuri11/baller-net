// Dependency injection for repositories
import { SessionSupabaseRepository } from './session-supabase-repository';
import { UserSupabaseRepository } from './user-supabase-repository';
import { PlayerSupabaseRepository } from './player-supabase-repository';

export const sessionRepository = new SessionSupabaseRepository();
export const userRepository = new UserSupabaseRepository();
export const playerRepository = new PlayerSupabaseRepository();
