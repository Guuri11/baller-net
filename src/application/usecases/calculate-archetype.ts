// Use case: Calculate player archetype based on player data
import { Archetype, PlayerCareerInfo, PlayerPhysicalInfo } from '@domain/player/value-objects';

type ArchetypeScoreFn = (career: PlayerCareerInfo) => number;

const archetypeScoring: Record<Archetype, ArchetypeScoreFn> = {
  [Archetype.SLASHING_PLAYMAKER]: c => c.pointsPerGame * 8 + c.assistsPerGame * 6 + c.stealsPerGame * 4 + c.reboundsPerGame * 2,
  [Archetype.SHARP_SHOOTING_PLAYMAKER]: c => c.pointsPerGame * 6 + c.assistsPerGame * 8 + c.reboundsPerGame * 2 + c.stealsPerGame * 4,
  [Archetype.DEFENSIVE_POINT_GUARD]: c => c.stealsPerGame * 10 + c.assistsPerGame * 6 + c.pointsPerGame * 2 + c.reboundsPerGame * 2,
  [Archetype.THREE_AND_D_POINT_GUARD]: c => c.pointsPerGame * 6 + c.stealsPerGame * 6 + c.assistsPerGame * 4 + c.reboundsPerGame * 4,
  [Archetype.POST_SCORING_POINT_GUARD]: c => c.pointsPerGame * 8 + c.reboundsPerGame * 4 + c.assistsPerGame * 4 + c.blocksPerGame * 4,
  [Archetype.THREE_LEVEL_SCORER]: c => c.pointsPerGame * 10 + c.assistsPerGame * 4 + c.reboundsPerGame * 2 + c.stealsPerGame * 4,
  [Archetype.SHOT_CREATING_WING]: c => c.pointsPerGame * 10 + c.assistsPerGame * 5 + c.reboundsPerGame * 1 + c.stealsPerGame * 2,
  [Archetype.THREE_AND_D_WING]: c => c.pointsPerGame * 8 + c.stealsPerGame * 6 + c.reboundsPerGame * 4 + c.assistsPerGame * 2,
  [Archetype.SLASHING_PLAYMAKER_GUARD]: c => c.pointsPerGame * 8 + c.assistsPerGame * 6 + c.reboundsPerGame * 2 + c.stealsPerGame * 4,
  [Archetype.PURE_SHOOTER]: c => c.pointsPerGame * 10 + c.reboundsPerGame * 2 + c.assistsPerGame * 2 + c.stealsPerGame * 1,
  [Archetype.ALL_AROUND_SUPERSTAR]: c => c.pointsPerGame * 8 + c.reboundsPerGame * 6 + c.assistsPerGame * 6 + c.blocksPerGame * 3 + c.stealsPerGame * 3,
  [Archetype.THREE_AND_D_SMALL_FORWARD]: c => c.pointsPerGame * 6 + c.stealsPerGame * 8 + c.reboundsPerGame * 4 + c.assistsPerGame * 2,
  [Archetype.SLASHING_PLAYMAKER_FORWARD]: c => c.pointsPerGame * 8 + c.assistsPerGame * 6 + c.reboundsPerGame * 2 + c.stealsPerGame * 4,
  [Archetype.POST_SCORING_FORWARD]: c => c.pointsPerGame * 10 + c.reboundsPerGame * 4 + c.blocksPerGame * 4 + c.assistsPerGame * 2,
  [Archetype.DEFENSIVE_SPECIALIST]: c => c.stealsPerGame * 10 + c.blocksPerGame * 6 + c.reboundsPerGame * 4 + c.pointsPerGame * 2,
  [Archetype.STRETCH_FOUR]: c => c.pointsPerGame * 8 + c.reboundsPerGame * 4 + c.assistsPerGame * 4 + c.stealsPerGame * 2,
  [Archetype.GLASS_CLEANER]: c => c.reboundsPerGame * 10 + c.blocksPerGame * 5 + c.pointsPerGame * 2 + c.assistsPerGame,
  [Archetype.DEFENSIVE_SPECIALIST_POWER_FORWARD]: c => c.blocksPerGame * 10 + c.reboundsPerGame * 6 + c.stealsPerGame * 4 + c.pointsPerGame * 2,
  [Archetype.SLASHING_ATHLETIC_POWER_FORWARD]: c => c.pointsPerGame * 8 + c.reboundsPerGame * 6 + c.blocksPerGame * 4 + c.assistsPerGame * 2,
  [Archetype.POST_SCORING_POWER_FORWARD]: c => c.pointsPerGame * 10 + c.reboundsPerGame * 4 + c.blocksPerGame * 4 + c.assistsPerGame * 2,
  [Archetype.TWO_WAY_FINISHING_BIG]: c => c.pointsPerGame * 8 + c.reboundsPerGame * 6 + c.blocksPerGame * 6 + c.stealsPerGame * 4,
  [Archetype.RIM_PROTECTING_POST_SCORER]: c => c.pointsPerGame * 8 + c.reboundsPerGame * 6 + c.blocksPerGame * 8 + c.assistsPerGame * 2,
  [Archetype.ATHLETIC_FINISHING_CENTER]: c => c.pointsPerGame * 10 + c.reboundsPerGame * 6 + c.blocksPerGame * 4 + c.stealsPerGame * 2,
  [Archetype.STRETCH_FIVE]: c => c.pointsPerGame * 8 + c.reboundsPerGame * 4 + c.assistsPerGame * 4 + c.blocksPerGame * 2,
  [Archetype.GLASS_CLEANER_CENTER]: c => c.reboundsPerGame * 10 + c.blocksPerGame * 5 + c.pointsPerGame * 2 + c.assistsPerGame,
};

export class CalculateArchetypeUseCase {
  execute(_physical: PlayerPhysicalInfo, career: PlayerCareerInfo): Archetype {
    let best: Archetype | null = null;
    let maxScore = -Infinity;
    for (const archetype of Object.values(Archetype)) {
      const scoreFn = archetypeScoring[archetype as Archetype];
      if (!scoreFn) continue;
      const score = scoreFn(career);
      if (score > maxScore) {
        maxScore = score;
        best = archetype as Archetype;
      }
    }
    // Fallback if something goes wrong
    return best ?? Archetype.GLASS_CLEANER;
  }
}
