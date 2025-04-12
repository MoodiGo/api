import { BaseError } from "./BaseError";

export class UserAlreadyExistsError extends BaseError {
  constructor() {
    super('User already exists', 409);
    this.name = 'UserAlreadyExistsError';
  }
}