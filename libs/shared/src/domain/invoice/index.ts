import { Address } from '../address'
import { EmptyError } from '../errors'
import { CurrencyText, DateText, StatusText, StringText } from '../helper'
import { Product } from '../product'

export class Invoice {
  constructor(
    private readonly _id: string,
    private readonly _date: DateText,
    private readonly _dueDate: DateText,
    private readonly _description: StringText,
    private readonly _currency: CurrencyText,
    private readonly _status: StatusText,
    private readonly _contact: StringText,
    private readonly _owner: string,
    private readonly _sender: Address,
    private readonly _buyer: {
      name: StringText
      address: Address
    },
    private readonly _products: Product[]
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

  get description(): string | null {
    return this._description.value
  }

  get currency(): string {
    return this._currency.value
  }

  get status(): string {
    return this._status.value
  }

  get contact(): string | null {
    return this._contact.value
  }

  get owner(): string {
    return this._owner
  }

  get sender(): Address['data'] {
    return this._sender.data
  }

  get buyer(): { name: string | null; address: Address['data'] } {
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
      StringText.fromString({
        _value: data.description,
        propertyName: 'description',
        maxLength: 255,
        required: false,
      }),
      CurrencyText.fromString(data.currency),
      StatusText.fromString(data.status),
      StringText.fromString({
        _value: data.contact,
        propertyName: "contact's name",
        maxLength: 50,
        required: true,
      }),
      data.owner,
      Address.fromData(data.sender),
      {
        name: StringText.fromString({
          _value: data.buyer.name,
          propertyName: 'buyer name',
          maxLength: 50,
          required: true,
        }),
        address: Address.fromData(data.buyer.address),
      },
      Product.fromArray(data.products)
    )
  }
}
