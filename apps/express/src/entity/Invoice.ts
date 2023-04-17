import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'
import { Address, Invoice, Product } from '@invoice/shared'

@Entity()
export class MongoInvoice implements Omit<Invoice['data'], 'id'> {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  date: string

  @Column()
  dueDate: string

  @Column()
  description: string

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

  updateInvoice(invoice: Invoice['data']) {
    this.date = invoice.date
    this.dueDate = invoice.dueDate
    this.description = invoice.description
    this.contact = invoice.contact
    this.sender = invoice.sender
    this.buyer = invoice.buyer
    this.products = invoice.products
  }

  isOwner(id: string) {
    return this.owner === id
  }
}
