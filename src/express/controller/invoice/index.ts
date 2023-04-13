import { ObjectId } from 'mongodb'
import { PostInvoiceUsecase } from '../../../application/invoice/usecase/post-invoice.usecase'
import { invoiceRepository, tokenService } from '../../../config'
import { UpdateInvoiceStatusUsecase } from '../../../application/invoice/usecase/update-status.usecase'
import { UpdateInvoiceUsecase } from '../../../application/invoice/usecase/update-invoice.usecase'
import { DeleteInvoiceUsecase } from '../../../application/invoice/usecase/delete-invoice.usecase'
import { GetAllInvoicesUsecase } from '../../../application/invoice/usecase/get-all-invoices.usecase'
import { GetOneInvoiceUsecase } from '../../../application/invoice/usecase/get-one-usecase'
import { Invoice } from '../../../domain/invoice'

export const updateStatus = async (req, res) => {
  const updateInvoiceStatusUsecase = new UpdateInvoiceStatusUsecase(invoiceRepository)
  try {
    const { id } = req.params
    const { status } = req.body
    await updateInvoiceStatusUsecase.handle(id, status)
    res.status(200).send()
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const updateInvoice = async (req, res) => {
  const updateInvoiceUsecase = new UpdateInvoiceUsecase(invoiceRepository)
  try {
    const { id } = req.params
    const { invoice: updateInvoiceCommand } = req.body

    await updateInvoiceUsecase.handle(updateInvoiceCommand)
    res.status(200).send()
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const removeInvoice = async (req, res) => {
  const deleteInvoiceUsecase = new DeleteInvoiceUsecase(invoiceRepository)
  try {
    const { id } = req.params

    await deleteInvoiceUsecase.handle({ id })
    res.status(200).send()
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const getAll = async (req, res) => {
  const getAllInvoiceUsecase = new GetAllInvoicesUsecase(invoiceRepository)
  try {
    const result = await getAllInvoiceUsecase.handle()
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export const getOneById = async (req, res) => {
  const getOneInvoiceUsecase = new GetOneInvoiceUsecase(invoiceRepository)
  try {
    const { id } = req.params
    let result = await getOneInvoiceUsecase.handle(id)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const add = async (req, res) => {
  const postInvoiceUsecase = new PostInvoiceUsecase(invoiceRepository, tokenService)
  try {
    const { invoice }: { invoice: Invoice['data'] } = req.body
    await postInvoiceUsecase.handle({ ...invoice, id: new ObjectId().toString() as any }, req.token)
    res.status(201).send()
  } catch (error) {
    res.status(500).send('Une erreur est survenue sur le server.' + error.message)
  }
}
