import { USER_ERRORS } from '../../domain/user/errors';
// src/infrastructure/repositories/user-supabase-repository.ts
// Supabase implementation of the UserRepository interface

import { supabase } from '../supabase/client';
import { User } from '../../domain/user/model';
import { UserRepository } from '../../domain/user/repository';

export class UserSupabaseRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return this.mapToDomainUser(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error || !data) return null;
    return this.mapToDomainUser(data);
  }

  async save(user: User): Promise<void> {
    const { data: sessionData } = await supabase.auth.getSession();
    const { error } = await supabase
      .from('users')
      .upsert({
        id: sessionData.session?.user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      });
    if (error) throw error;
  }

  async register(params: { name: string; email: string; password: string }): Promise<User> {
    // Registration is handled by Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          username: params.name,
        },
      },
    });
    if (error) {
      if (error.message && error.message.toLowerCase().includes('already registered')) {
        throw new Error('user.error.email_already_exists');
      }
      if (error.message && error.message.toLowerCase().includes('invalid email')) {
        throw new Error(USER_ERRORS.INVALID_EMAIL);
      }
      throw new Error('user.error.registration_failed');
    }
    if (!data.user || !data.user.email) throw new Error('user.error.registration_failed');

    // Insert user profile in users table
    const userProfile = {
      id: data.user.id,
      email: data.user.email ?? '',
      username: params.name,
      createdAt: new Date(data.user.created_at),
      updatedAt: new Date(data.user.updated_at || data.user.created_at),
    };
    await this.save(new User(userProfile));
    return new User(userProfile);
  }

  private mapToDomainUser(data: any): User {
    return new User({
      id: data.id,
      email: data.email,
      username: data.username,
      avatarUrl: data.avatarUrl,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }
}
