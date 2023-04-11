import { ObjectId } from 'mongodb'
import { Invoice } from '../../domain/invoice'
import { MongoInvoice } from '../../entity/Invoice'

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
  mongoInvoice._id = new ObjectId(invoice.data.id) as any
  return mongoInvoice
}
