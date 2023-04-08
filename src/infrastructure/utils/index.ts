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
    items: mongoInvoice.items,
  })
}
