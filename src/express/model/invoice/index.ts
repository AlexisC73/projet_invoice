import { AppDataSource } from '../../../data-source'
import { MongoInvoice } from '../../../entity/Invoice'
import { Invoice } from '../../../domain/invoice'
import { GetAllInvoicesUsecase } from '../../../application/invoice/usecase/get-all-invoices.usecase'
import { MongoInvoiceRepository } from '../../../infrastructure/mongo.invoice.repository'
import { GetOneInvoiceUsecase } from '../../../application/invoice/usecase/get-one-usecase'
import { PostInvoiceCommand, PostInvoiceUsecase } from '../../../application/invoice/usecase/post-invoice.usecase'
import { DeleteInvoiceUsecase } from '../../../application/invoice/usecase/delete-invoice.usecase'
import { UpdateInvoiceCommand, UpdateInvoiceUsecase } from '../../../application/invoice/usecase/update-invoice.usecase'
import { UpdateInvoiceStatusUsecase } from '../../../application/invoice/usecase/update-status.usecase'
import { ObjectId } from 'mongodb'

const invoiceRepo = AppDataSource.getRepository(MongoInvoice)
const mongoInvoiceRepository = new MongoInvoiceRepository(invoiceRepo)

export const updateStatus = async (invoiceToUpdateId: string, status: string): Promise<void> => {
  const updateInvoiceStatusUsecase = new UpdateInvoiceStatusUsecase(mongoInvoiceRepository)

  await updateInvoiceStatusUsecase.handle(invoiceToUpdateId, status)
  return Promise.resolve()
}

export const updateInvoice = async (
  invoiceToUpdateId: string,
  updateInvoiceCommand: UpdateInvoiceCommand
): Promise<void> => {
  const updateInvoiceUsecase = new UpdateInvoiceUsecase(mongoInvoiceRepository)

  await updateInvoiceUsecase.handle({ ...updateInvoiceCommand, id: invoiceToUpdateId })
  return Promise.resolve()
}

export const removeInvoice = async (id: string): Promise<void> => {
  const deleteInvoiceUsecase = new DeleteInvoiceUsecase(mongoInvoiceRepository)

  await deleteInvoiceUsecase.handle({ id })
  return Promise.resolve()
}

export const getOneById = async (id: string): Promise<Invoice['data']> => {
  const getOneInvoiceUsecase = new GetOneInvoiceUsecase(mongoInvoiceRepository)

  const result = await getOneInvoiceUsecase.handle(id)
  return result.data
}

export const getAll = async (): Promise<Invoice['data'][]> => {
  const getAllInvoicesUsecase = new GetAllInvoicesUsecase(mongoInvoiceRepository)

  const result = await getAllInvoicesUsecase.handle()
  return result.map(invoice => invoice.data)
}

export const addNewInvoice = async (postInvoiceCommand: PostInvoiceCommand): Promise<void> => {
  const postInvoiceUsecase = new PostInvoiceUsecase(mongoInvoiceRepository)

  await postInvoiceUsecase.handle({ ...postInvoiceCommand, id: new ObjectId() as any })
  return Promise.resolve()
}
