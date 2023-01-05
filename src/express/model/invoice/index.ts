import { FindOptionsWhere } from 'typeorm'
import { ObjectId } from 'mongodb'
import { AppDataSource } from '../../../data-source'
import { MongoInvoice } from '../../../entity/Invoice'

const invoiceRepo = AppDataSource.getRepository(MongoInvoice)

export const updateStatus = async (invoiceToUpdate: MongoInvoice, status: string): Promise<MongoInvoice> => {
  try {
    invoiceToUpdate.status = status
    return await invoiceRepo.save(invoiceToUpdate)
  } catch (error) {
    throw new Error(error)
  }
}

export const updateInvoice = async (invoiceToUpdate: MongoInvoice, invoice: Invoice): Promise<MongoInvoice> => {
  try {
    invoiceToUpdate.updateInvoice(invoice)
    return await invoiceRepo.save(invoiceToUpdate)
  } catch (error) {
    throw new Error(error)
  }
}

export const removeInvoice = async (invoice: MongoInvoice): Promise<MongoInvoice> => {
  try {
    return await invoiceRepo.remove(invoice)
  } catch (error) {
    throw new Error(error)
  }
}

export const getOneById = async (id: string): Promise<MongoInvoice> => {
  try {
    const find: FindOptionsWhere<MongoInvoice> = {
      _id: new ObjectId(id) as any, //Obligation de mettre any sinon erreur (non compatibilité du type ObjectID et ObjectId)
    }
    return await invoiceRepo.findOne({ where: find })
  } catch (error) {
    throw new Error(error)
  }
}
export const getAll = async (): Promise<MongoInvoice[]> => {
  try {
    return await invoiceRepo.find()
  } catch (error) {
    throw new Error(error)
  }
}

export const addNewInvoice = async (invoice: MongoInvoice): Promise<MongoInvoice> => {
  try {
    return await invoiceRepo.save(invoice)
  } catch (error) {
    throw new Error(error)
  }
}
