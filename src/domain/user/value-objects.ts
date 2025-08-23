// Value objects for User domain entity

export class UserId {
  constructor(public readonly value: string) {
    if (!value || value.length < 3) {
      throw new Error('user.validation_error.invalid_id');
    }
  }
}

export class Email {
  constructor(public readonly value: string) {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      throw new Error('user.validation_error.invalid_email');
    }
  }
}
