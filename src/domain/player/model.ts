// Player aggregate root for Baller Net

import { PlayerCareerInfo, Archetype, PlayerPhysicalInfo, PlayerPersonalInfo } from "./value-objects";

export type PlayerProps = {
  id: string;
  userId: string;
  personal: PlayerPersonalInfo;
  physical: PlayerPhysicalInfo;
  career: PlayerCareerInfo;
  archetype?: Archetype;
  createdAt: Date;
  updatedAt: Date;
};

export class Player {
  readonly id: string;
  readonly userId: string;
  readonly personal: PlayerPersonalInfo;
  readonly physical: PlayerPhysicalInfo;
  readonly career: PlayerCareerInfo;
  readonly archetype?: Archetype;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: PlayerProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.personal = props.personal;
    this.physical = props.physical;
    this.career = props.career;
    this.archetype = props.archetype;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
