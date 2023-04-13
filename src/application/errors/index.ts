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

export class StatusError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid status')
    this.name = 'StatusError'
  }
}

export class EmptyError extends Error {
  constructor(message?: string) {
    super(message ?? 'Empty value')
    this.name = 'EmptyError'
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Not found error')
    this.name = 'NotFoundError'
  }
}

export class RoleError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid persmission')
    this.name = 'RoleError'
  }
}
