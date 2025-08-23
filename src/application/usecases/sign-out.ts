// Use case: Sign out user
import { SessionRepository } from '../../domain/session/repository';

export class SignOutUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(): Promise<void> {
    return this.sessionRepository.clearSession();
  }
}
