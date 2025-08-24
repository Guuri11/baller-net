// Player repository interface for domain layer
import { Player } from './model';

export interface PlayerRepository {
  findById(id: string): Promise<Player | null>;
  findByUserId(userId: string): Promise<Player | null>;
  save(player: Player): Promise<void>;
}
