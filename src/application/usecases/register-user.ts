// Use case: Register a new user
import { UserRepository } from '@domain/user/repository';
import { User } from '@domain/user/model';
import { USER_ERRORS } from '@domain/user/errors';

export interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: RegisterUserParams): Promise<User> {
    // Validate input
    if (!params.name || params.name.length < 2) {
      throw new Error(USER_ERRORS.INVALID_ID);
    }
    if (!params.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(params.email)) {
      throw new Error(USER_ERRORS.INVALID_EMAIL);
    }
    if (!params.password || params.password.length < 6) {
      throw new Error('user.validation_error.invalid_password');
    }
    // Check if user already exists
    const existing = await this.userRepository.findByEmail(params.email);
    if (existing) {
      throw new Error('user.error.email_already_exists');
    }
    // Register user
    return this.userRepository.register(params);
  }
}
