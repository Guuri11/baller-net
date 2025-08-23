// Session aggregate root for Baller Net domain
import { User } from '../user/model';

export interface SessionProps {
  user: User | null;
  isAuthenticated: boolean;
  expiresAt?: Date;
}

export class Session {
  readonly user: User | null;
  readonly isAuthenticated: boolean;
  readonly expiresAt?: Date;

  constructor(props: SessionProps) {
    this.user = props.user;
    this.isAuthenticated = props.isAuthenticated;
    this.expiresAt = props.expiresAt;
  }
}
