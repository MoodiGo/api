export class DatabaseQueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseQueryError';
  }
}