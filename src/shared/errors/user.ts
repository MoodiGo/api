import { BaseError } from "./BaseError";

export class UserAlreadyExistsError extends BaseError {
  constructor() {
    super('User already exists', 409);
    this.name = 'UserAlreadyExistsError';
  }
}

export class UserDoesNotExistError extends BaseError {
  constructor() {
    super('User does not exist', 404);
    this.name = 'UserDoesNotExistError';
  }
}