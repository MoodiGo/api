export class UserLifestyleAlreadyExistsError extends Error {
    constructor() {
      super('User lifestyle already exists');
      this.name = 'UserLifestyleAlreadyExistsError';
    }
  }