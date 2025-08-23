// Use case: Sign in user
import { User } from '../../domain/user/model';
import { Session } from '../../domain/session/model';
import { SessionRepository } from '../../domain/session/repository';

export interface SignInParams {
  email: string;
  password: string;
}

export class SignInUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(params: SignInParams): Promise<Session> {
    // The actual implementation will be in infrastructure
    // This contract expects infra to handle authentication and session creation
    return this.sessionRepository.signIn(params.email, params.password);
  }
}
