// Use case: Check current session authentication status
import { SessionRepository } from '../../domain/session/repository';
import { Session } from '../../domain/session/model';

export class CheckSessionUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(): Promise<Session> {
    return this.sessionRepository.getCurrentSession();
  }
}
