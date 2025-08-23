// Session repository interface for domain layer
import { Session } from './model';

export interface SessionRepository {
  getCurrentSession(): Promise<Session>;
  signIn(email: string, password: string): Promise<Session>;
  clearSession(): Promise<void>;
}
