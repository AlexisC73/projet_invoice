import { EmptyError } from '../errors'
import {
  CurrencyText,
  DateText,
  OptionnalString,
  RequiredString,
  StatusText,
} from '../helper'

export class Invoice {
  constructor(
    private readonly _id: string,
    private readonly _date: DateText,
    private readonly _dueDate: DateText,
    private readonly _description: OptionnalString,
    private readonly _currency: CurrencyText,
    private readonly _status: StatusText,
    private readonly _contact: RequiredString,
    private readonly _owner: string,
    private readonly _sender: Address,
    private readonly _buyer: {
      name: RequiredString
      address: Address
    },
    private readonly _products: Product[]
  ) {}

  get id() {
    return this._id
  }

  get date() {
    return this._date.value
  }

  get dueDate() {
    return this._dueDate.value
  }

  get description() {
    return this._description.value
  }

  get currency() {
    return this._currency.value
  }

  get status() {
    return this._status.value
  }

  get contact() {
    return this._contact.value
  }

  get owner() {
    return this._owner
  }

  get sender() {
    return this._sender.data
  }

  get buyer() {
    return { name: this._buyer.name.value, address: this._buyer.address.data }
  }

  get products() {
    return this._products.map((item) => item.data)
  }

  get data() {
    return {
      id: this.id,
      date: this.date,
      dueDate: this.dueDate,
      description: this.description,
      currency: this.currency,
      status: this.status,
      contact: this.contact,
      owner: this.owner,
      sender: this.sender,
      buyer: this.buyer,
      products: this.products,
    }
  }

  static fromData(data: Invoice['data']) {
    if (!data.sender) {
      throw new EmptyError("sender's address is required")
    }
    if (!data.buyer.address) {
      throw new EmptyError("buyer's address is required")
    }

    return new Invoice(
      data.id,
      DateText.fromString(data.date),
      DateText.fromString(data.dueDate),
      OptionnalString.fromString({
        _value: data.description,
        propertyName: 'description',
        maxLength: 255,
      }),
      CurrencyText.fromString(data.currency),
      StatusText.fromString(data.status),
      RequiredString.fromString({
        _value: data.contact,
        propertyName: "contact's name",
        maxLength: 50,
      }),
      data.owner,
      Address.fromData(data.sender),
      {
        name: RequiredString.fromString({
          _value: data.buyer.name,
          propertyName: 'buyer name',
          maxLength: 50,
        }),
        address: Address.fromData(data.buyer.address),
      },
      Product.fromArray(data.products)
    )
  }
}

export class Address {
  constructor(
    private readonly _street: RequiredString,
    private readonly _city: RequiredString,
    private readonly _zip: RequiredString,
    private readonly _country: RequiredString
  ) {}

  get street() {
    return this._street.value
  }

  get city() {
    return this._city.value
  }

  get zip() {
    return this._zip.value
  }

  get country() {
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
      RequiredString.fromString({
        _value: data.street,
        propertyName: 'seller street',
        maxLength: 100,
      }),
      RequiredString.fromString({
        _value: data.city,
        propertyName: 'seller city',
        maxLength: 50,
      }),
      RequiredString.fromString({
        _value: data.zip,
        propertyName: 'seller zip code',
        maxLength: 50,
      }),
      RequiredString.fromString({
        _value: data.country,
        propertyName: 'seller country',
        maxLength: 50,
      })
    )
  }
}

export class Product {
  constructor(
    private readonly _id: string,
    private readonly _name: RequiredString,
    private readonly _quantity: string,
    private readonly _unitPrice: string,
    private readonly _description: OptionnalString
  ) {}

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name.value
  }

  get quantity(): string {
    return this._quantity
  }

  get unitPrice(): string {
    return this._unitPrice
  }

  get description(): string | null {
    return this._description.value
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      description: this.description,
    }
  }

  static fromData(data: Product['data']) {
    return new Product(
      data.id,
      RequiredString.fromString({
        _value: data.name,
        propertyName: 'product name',
        maxLength: 100,
      }),
      data.quantity,
      data.unitPrice,
      OptionnalString.fromString({
        _value: data.description,
        propertyName: 'product description',
        maxLength: 100,
      })
    )
  }

  static fromArray(data: Product['data'][]): Product[] {
    return data.map((product) => Product.fromData(product))
  }
}
