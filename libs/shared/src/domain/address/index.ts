import { StringText } from '../helper'

export default class Address {
  constructor(
    private readonly _street: StringText,
    private readonly _city: StringText,
    private readonly _zip: StringText,
    private readonly _country: StringText
  ) {}

  get street(): string | null {
    return this._street.value
  }

  get city(): string | null {
    return this._city.value
  }

  get zip(): string | null {
    return this._zip.value
  }

  get country(): string | null {
    return this._country.value
  }

  get data() {
    return {
      street: this.street,
      city: this.city,
      zip: this.zip,
      country: this.country,
    }
  }

  static fromData(data: Address['data']) {
    return new Address(
      StringText.fromString({
        _value: data.street,
        propertyName: 'seller street',
        maxLength: 100,
        required: true,
      }),
      StringText.fromString({
        _value: data.city,
        propertyName: 'seller city',
        maxLength: 50,
        required: true,
      }),
      StringText.fromString({
        _value: data.zip,
        propertyName: 'seller zip code',
        maxLength: 50,
        required: true,
      }),
      StringText.fromString({
        _value: data.country,
        propertyName: 'seller country',
        maxLength: 50,
        required: true,
      })
    )
  }
}
