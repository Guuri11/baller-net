// User repository interface for domain layer
import { User } from './model';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  register(params: { name: string; email: string; password: string }): Promise<User>;
}
