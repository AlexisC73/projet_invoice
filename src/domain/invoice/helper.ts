import { CurrencyError, InvalidDateError, TooLongError } from '../../application/errors'

export class DateText {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value
  }

  static fromString(_date: string) {
    const date = new Date(_date)
    if (isNaN(date.getTime())) {
      throw new InvalidDateError("Date can't be parsed, please use YYYY-MM-DD format")
    }
    return new DateText(date.toISOString())
  }
}

export class DescriptionText {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value
  }

  static fromString(_description: string) {
    if (!!_description && _description.trim().length > 255) {
      throw new TooLongError('Description can not be longer than 255 characters')
    }
    return new DescriptionText(_description ? _description.trim() : '')
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
      throw new CurrencyError('Problem with currency, please try again later.')
    }
    if (!available.includes(_currency.trim().toUpperCase())) {
      throw new CurrencyError(`${_currency} is not available yet`)
    }
    return new CurrencyText(_currency.trim().toUpperCase())
  }
}
