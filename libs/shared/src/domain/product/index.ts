import { StringText } from '../helper'

export class Product {
  constructor(
    private readonly _id: string,
    private readonly _name: StringText,
    private readonly _quantity: string,
    private readonly _unitPrice: string,
    private readonly _description: StringText
  ) {}

  get id(): string {
    return this._id
  }

  get name(): string | null {
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
      StringText.fromString({
        _value: data.name,
        propertyName: 'product name',
        required: true,
        maxLength: 100,
      }),
      data.quantity,
      data.unitPrice,
      StringText.fromString({
        _value: data.description,
        propertyName: 'product description',
        required: false,
        maxLength: 100,
      })
    )
  }

  static fromArray(data: Product['data'][]): Product[] {
    return data.map((product) => Product.fromData(product))
  }
}
