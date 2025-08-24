// src/infrastructure/repositories/session-supabase-repository.ts
// Supabase implementation of the SessionRepository interface

import { supabase } from '../supabase/client';
import { SessionRepository } from '../../domain/session/repository';
import { Session } from '@domain/session/model';
import { User } from '@domain/user/model';
import { SESSION_ERRORS } from '../../domain/session/errors';

export class SessionSupabaseRepository implements SessionRepository {
  async getCurrentSession(): Promise<Session> {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      return new Session({ user: null, isAuthenticated: false });
    }
    const user = this.mapToDomainUser(data.session.user);
    return new Session({
      user,
      isAuthenticated: true,
      expiresAt: data.session.expires_at ? new Date(data.session.expires_at * 1000) : undefined,
    });
  }

  async signIn(email: string, password: string): Promise<Session> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message && error.message.toLowerCase().includes('invalid login credentials')) {
        throw new Error('session.error.invalid_credentials');
      }
      if (error.message && error.message.toLowerCase().includes('not authenticated')) {
        throw new Error(SESSION_ERRORS.NOT_AUTHENTICATED);
      }
      throw new Error('session.error.signin_failed');
    }
    if (!data.session) {
      throw new Error('session.error.signin_failed');
    }
    const user = this.mapToDomainUser(data.user);
    return new Session({
      user,
      isAuthenticated: true,
      expiresAt: data.session.expires_at ? new Date(data.session.expires_at * 1000) : undefined,
    });
  }

  async clearSession(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  private mapToDomainUser(data: any): User {
    return new User({
      id: data?.id ?? '',
      email: data?.email ?? '',
      username: data?.user_metadata?.username ?? '',
      avatarUrl: data?.user_metadata?.avatarUrl,
      createdAt: data?.created_at ? new Date(data.created_at) : new Date(),
      updatedAt: data?.updated_at ? new Date(data.updated_at) : new Date(),
    });
  }
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}
