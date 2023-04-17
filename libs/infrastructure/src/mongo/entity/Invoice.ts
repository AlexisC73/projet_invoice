import { Invoice, Address, Product } from '@invoice/domain/dist/invoice'
import { ObjectId } from 'mongodb'
import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'

@Entity()
export class TypeormMongoInvoice implements Omit<Invoice['data'], 'id'> {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  date: string

  @Column()
  dueDate: string

  @Column({ nullable: true })
  description: string | null

  @Column()
  owner: string

  @Column()
  currency: string

  @Column()
  status: string

  @Column()
  contact: string

  @Column()
  sender: Address['data']

  @Column()
  buyer: {
    name: string
    address: Address['data']
  }

  @Column()
  products: Product['data'][]

  toDomainInvoice(): Invoice {
    return Invoice.fromData({
      id: this._id.toString(),
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
    })
  }

  static fromDomainInvoice(invoice: Invoice): TypeormMongoInvoice {
    const mongoInvoice = new TypeormMongoInvoice()
    mongoInvoice._id = new ObjectId(invoice.id) as any
    mongoInvoice.date = invoice.date
    mongoInvoice.dueDate = invoice.dueDate
    mongoInvoice.description = invoice.description
    mongoInvoice.currency = invoice.currency
    mongoInvoice.status = invoice.status
    mongoInvoice.contact = invoice.contact
    mongoInvoice.owner = invoice.owner
    mongoInvoice.sender = invoice.sender
    mongoInvoice.buyer = invoice.buyer
    mongoInvoice.products = invoice.products
    return mongoInvoice
  }
}
