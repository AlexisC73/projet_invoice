export class InvalidDateError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid date')
    this.name = 'InvalidDateError'
  }
}

export class TooLongError extends Error {
  constructor(message?: string) {
    super(message ?? 'Too long text')
    this.name = 'TooLongError'
  }
}

export class CurrencyError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid currency')
    this.name = 'CurrencyError'
  }
}
