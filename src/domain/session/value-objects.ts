// Value objects for Session domain entity

export class SessionToken {
  constructor(public readonly value: string) {
    if (!value || value.length < 10) {
      throw new Error('session.validation_error.invalid_token');
    }
  }
}
