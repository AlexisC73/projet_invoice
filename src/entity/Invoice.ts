import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'

@Entity()
export class MongoInvoice implements Omit<Invoice, 'id'> {
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
  sender: Adress

  @Column()
  buyer: {
    name: string
    address: Adress
  }

  @Column()
  items: Product[]

  updateInvoice(invoice: Invoice) {
    this.date = invoice.date
    this.dueDate = invoice.dueDate
    this.description = invoice.description
    this.contact = invoice.contact
    this.sender = invoice.sender
    this.buyer = invoice.buyer
    this.items = invoice.items
  }

  isOwner(id: string) {
    return this.owner === id
  }
}
