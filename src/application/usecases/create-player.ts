// Use case: Create a new player for a user
import { PlayerRepository } from '@domain/player/repository';
import { Player, PlayerProps } from '@domain/player/model';
import { PLAYER_ERRORS } from '@domain/player/errors';

export class CreatePlayerUseCase {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async execute(props: PlayerProps): Promise<Player> {
    // Validate personal info
    const { personal, physical, career } = props;
    if (!personal || !personal.username || personal.username.length < 3) {
      throw new Error(PLAYER_ERRORS.INVALID_PERSONAL_INFO);
    }
    if (!personal.gender || !['MALE', 'FEMALE', 'OTHER'].includes(personal.gender)) {
      throw new Error(PLAYER_ERRORS.INVALID_PERSONAL_INFO);
    }
    if (!personal.birthday || isNaN(new Date(personal.birthday).getTime())) {
      throw new Error(PLAYER_ERRORS.INVALID_PERSONAL_INFO);
    }
    // Validate physical info
    if (!physical || physical.heightCm < 100 || physical.heightCm > 250 || physical.weightKg < 30 || physical.weightKg > 200) {
      throw new Error(PLAYER_ERRORS.INVALID_PHYSICAL_INFO);
    }
    // Validate career info
    if (!career || !career.position || career.pointsPerGame < 0) {
      throw new Error(PLAYER_ERRORS.INVALID_CAREER_INFO);
    }
    // Create and save player
    const player = new Player(props);
    await this.playerRepository.save(player);
    return player;
  }
}
