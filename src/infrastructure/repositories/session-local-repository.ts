// Local (in-memory) implementation of SessionRepository for development/testing
import { SessionRepository } from '../../domain/session/repository';
import { Session } from '../../domain/session/model';
import { User } from '../../domain/user/model';

const FAKE_USER: User = new User({
  id: 'user-1',
  email: 'test@baller.net',
  username: 'testuser',
  avatarUrl: undefined,
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-01T00:00:00Z'),
});

let currentSession: Session = new Session({
  user: null,
  isAuthenticated: false,
});

export class SessionLocalRepository implements SessionRepository {
  async getCurrentSession(): Promise<Session> {
    return currentSession;
  }

  async signIn(email: string, password: string): Promise<Session> {
    // Fake authentication: accept only the hardcoded user
    if (email === FAKE_USER.email && password === 'password') {
      currentSession = new Session({
        user: FAKE_USER,
        isAuthenticated: true,
      });
      return currentSession;
    }
    currentSession = new Session({ user: null, isAuthenticated: false });
    throw new Error('session.error.not_authenticated');
  }

  async clearSession(): Promise<void> {
    currentSession = new Session({ user: null, isAuthenticated: false });
  }
}
