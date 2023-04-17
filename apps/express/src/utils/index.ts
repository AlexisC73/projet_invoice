import { ObjectId } from 'mongodb'
import { MongoInvoice } from '../entity/Invoice'
import { User } from '../domain/user/user'
import { MongoUser } from '../entity/User'
import { Invoice } from '@invoice/shared/dist/domain/invoice'

export const mongoInvoiceToInvoice = (mongoInvoice: MongoInvoice): Invoice => {
  return Invoice.fromData({
    id: mongoInvoice._id.toString(),
    date: mongoInvoice.date,
    dueDate: mongoInvoice.dueDate,
    description: mongoInvoice.description,
    currency: mongoInvoice.currency,
    status: mongoInvoice.status,
    contact: mongoInvoice.contact,
    owner: mongoInvoice.owner,
    sender: mongoInvoice.sender,
    buyer: mongoInvoice.buyer,
    products: mongoInvoice.products,
  })
}

export const invoiceToMongoInvoice = (invoice: Invoice): MongoInvoice => {
  const mongoInvoice = new MongoInvoice()
  mongoInvoice.date = invoice.data.date
  mongoInvoice.dueDate = invoice.data.dueDate
  mongoInvoice.description = invoice.data.description
  mongoInvoice.currency = invoice.data.currency
  mongoInvoice.owner = invoice.data.owner
  mongoInvoice.status = invoice.data.status
  mongoInvoice.contact = invoice.data.contact
  mongoInvoice.sender = invoice.data.sender
  mongoInvoice.buyer = invoice.data.buyer
  mongoInvoice.products = invoice.data.products
  mongoInvoice._id = new ObjectId(invoice.id) as any
  return mongoInvoice
}

export const mongoUserToUser = (mongoUser: MongoUser): User => {
  return User.fromData({
    id: mongoUser._id.toString(),
    email: mongoUser.email,
    password: mongoUser.password,
    role: mongoUser.role,
    linkedAccounts: mongoUser.linkedAccounts,
  })
}

export const userToMongoUser = (user: User): MongoUser => {
  const mongoUser = new MongoUser()
  mongoUser.email = user.data.email
  mongoUser.password = user.data.password
  mongoUser.linkedAccounts = user.data.linkedAccounts
  mongoUser.role = user.data.role
  mongoUser._id = new ObjectId(user.id) as any
  return mongoUser
}
