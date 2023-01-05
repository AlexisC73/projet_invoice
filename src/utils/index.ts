import { MongoInvoice } from '../entity/Invoice'
import { MongoUser } from '../entity/User'
import * as bcrypt from 'bcrypt'

export const returnInvoice = (invoice: MongoInvoice): Invoice => {
  const { _id, ...rest } = invoice
  return {
    id: _id.toHexString(),
    ...rest,
  }
}

export const verifyBuyer = (buyer: { name: string; address: Adress }): boolean => {
  if (!buyer.name) return false
  if (verifyAdress(buyer.address)) return false
  return true
}

export const verifyAdress = (buyer: Adress): boolean => {
  if (!buyer) return false
  return true
}

export const createMongoInvoice = (invoice: Omit<Invoice, 'id'>): MongoInvoice => {
  const newInvoice = new MongoInvoice()
  newInvoice.date = invoice.date
  newInvoice.dueDate = invoice.dueDate
  newInvoice.description = invoice.description || ''
  newInvoice.currency = 'USD'
  newInvoice.owner = invoice.owner
  newInvoice.status = invoice.status || 'pending'
  newInvoice.contact = invoice.contact
  newInvoice.sender = invoice.sender
  newInvoice.buyer = invoice.buyer
  newInvoice.items = invoice.items
  return newInvoice
}

export const createMongoUser = (googleId: string, photoUrl: string): MongoUser => {
  const newUser = new MongoUser()
  newUser.googleId = googleId
  newUser.role = ROLE.USER
  newUser.createdAt = new Date().toISOString()
  newUser.updatedAt = new Date().toISOString()
  return newUser
}

export const mongoUserToUser = (mongoUser: MongoUser): User => {
  const { _id, ...rest } = mongoUser
  return {
    id: _id.toHexString(),
    ...rest,
  }
}

export const ROLE = {
  USER: 100,
  MODERATOR: 200,
  ADMIN: 300,
}
