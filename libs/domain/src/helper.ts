import {
  CurrencyError,
  EmptyError,
  InvalidDateError,
  StatusError,
  TooLongError,
} from './errors'

export class OptionnalString {
  private constructor(private readonly _value: string | null) {}

  get value() {
    return this._value
  }

  static fromString({
    _value,
    propertyName,
    maxLength,
  }: {
    _value: string | null
    propertyName: string
    maxLength?: number
  }) {
    if (!_value || _value.trim().length <= 0 || typeof _value === 'undefined') {
      return new OptionnalString(null)
    }
    if (!!maxLength && _value.trim().length > maxLength) {
      throw new TooLongError(
        `${propertyName} can not be longer than ${maxLength} characters`
      )
    }
    return new OptionnalString(_value.trim())
  }
}

export class RequiredString {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value
  }

  static fromString({
    _value,
    propertyName,
    maxLength,
  }: {
    _value: string
    propertyName: string
    maxLength?: number
  }) {
    if (!_value || _value.trim().length <= 0 || typeof _value === 'undefined') {
      throw new EmptyError(`${propertyName} is required`)
    }
    if (!!maxLength && _value.trim().length > maxLength) {
      throw new TooLongError(
        `${propertyName} can not be longer than ${maxLength} characters`
      )
    }
    return new RequiredString(_value.trim())
  }
}

export class DateText {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value
  }

  static fromString(_date: string) {
    const date = new Date(_date)
    if (isNaN(date.getTime())) {
      throw new InvalidDateError(
        "Date can't be parsed, please use YYYY-MM-DD format"
      )
    }
    return new DateText(date.toISOString())
  }
}

export class CurrencyText {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value
  }

  static fromString(_currency: string) {
    const available = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY', 'CNY']

    if (!_currency || _currency.trim().length <= 0) {
      throw new CurrencyError('Currency is required.')
    }
    if (!available.includes(_currency.trim().toUpperCase())) {
      throw new CurrencyError(`${_currency} is not available yet`)
    }
    return new CurrencyText(_currency.trim().toUpperCase() ?? 'USD')
  }
}

export class StatusText {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value
  }

  static fromString(_status: string) {
    const available = ['pending', 'paid', 'draft']
    if (!_status) {
      throw new StatusError('Problem with status, please try again later.')
    }
    if (!available.includes(_status.trim().toLowerCase())) {
      throw new StatusError(`${_status} is not available`)
    }
    return new StatusText(_status.trim().toLowerCase())
  }
}
