import { BaseError } from "./BaseError";

export class UserLifestyleAlreadyExistsError extends BaseError {
    constructor() {
      super('User lifestyle already exists', 409);
      this.name = 'UserLifestyleAlreadyExistsError';
    }
  }
