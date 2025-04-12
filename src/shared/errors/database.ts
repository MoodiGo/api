export class DatabaseQueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseQueryError';
  }
}

export class DatabaseInsertError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseInsertError';
  }
}