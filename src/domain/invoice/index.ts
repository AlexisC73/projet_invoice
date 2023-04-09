import { ContactName, CurrencyText, DateText, DescriptionText, StatusText } from './helper'

export class Invoice {
  constructor(
    private readonly _id: string,
    private readonly _date: DateText,
    private readonly _dueDate: DateText,
    private readonly _description: DescriptionText,
    private readonly _currency: CurrencyText,
    private readonly _status: StatusText,
    private readonly _contact: ContactName,
    private readonly _owner: string,
    private readonly _sender: Address,
    private readonly _buyer: {
      name: string
      address: Address
    },
    private readonly _items: Product[]
  ) {}

  get id(): string {
    return this._id
  }

  get date(): string {
    return this._date.value
  }

  get dueDate(): string {
    return this._dueDate.value
  }

  get description(): string {
    return this._description.value
  }

  get currency(): string {
    return this._currency.value
  }

  get status(): string {
    return this._status.value
  }

  get contact(): string {
    return this._contact.value
  }

  get owner(): string {
    return this._owner
  }

  get sender() {
    return this._sender.data
  }

  get buyer() {
    return { name: this._buyer.name, address: this._buyer.address.data }
  }

  get items() {
    return this._items.map(item => item.data)
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
      items: this.items,
    }
  }

  static fromData(data: Invoice['data']) {
    return new Invoice(
      data.id,
      DateText.fromString(data.date),
      DateText.fromString(data.dueDate),
      DescriptionText.fromString(data.description),
      CurrencyText.fromString(data.currency),
      StatusText.fromString(data.status),
      ContactName.fromString(data.contact),
      data.owner,
      Address.fromData(data.sender),
      { name: data.buyer.name, address: Address.fromData(data.buyer.address) },
      Product.fromArray(data.items)
    )
  }
}

export class Address {
  constructor(
    private readonly _street: string,
    private readonly _city: string,
    private readonly _zip: string,
    private readonly _country: string
  ) {}

  get street(): string {
    return this._street
  }

  get city(): string {
    return this._city
  }

  get zip(): string {
    return this._zip
  }

  get country(): string {
    return this._country
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
    return new Address(data.street, data.city, data.zip, data.country)
  }
}

export class Product {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _quantity: string,
    private readonly _unitPrice: string,
    private readonly _description: string
  ) {}

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get quantity(): string {
    return this._quantity
  }

  get unitPrice(): string {
    return this._unitPrice
  }

  get description(): string {
    return this._description
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
    return new Product(data.id, data.name, data.quantity, data.unitPrice, data.description)
  }

  static fromArray(data: Product['data'][]): Product[] {
    return data.map(product => Product.fromData(product))
  }
}
