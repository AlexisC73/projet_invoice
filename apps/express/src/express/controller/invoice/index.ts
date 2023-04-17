import { ObjectId } from 'mongodb'
import { invoiceRepository, tokenService, userRepository } from '../../../config'

import { UpdateInvoiceStatusUsecase } from '../../../domain/invoice/usecases/update-status.usecase'
import { UpdateInvoiceUsecase } from '../../../domain/invoice/usecases/update-invoice.usecase'
import { DeleteInvoiceUsecase } from '../../../domain/invoice/usecases/delete-invoice.usecase'
import { GetAllInvoicesUsecase } from '../../../domain/invoice/usecases/get-all-invoices.usecase'
import { GetOneInvoiceUsecase } from '../../../domain/invoice/usecases/get-one-usecase'
import { PostInvoiceCommand, PostInvoiceUsecase } from '../../../domain/invoice/usecases/post-invoice.usecase'
import { Invoice } from '@invoice/shared/src/domain/invoice'

export const updateStatus = async (req, res) => {
  const updateInvoiceStatusUsecase = new UpdateInvoiceStatusUsecase(invoiceRepository, userRepository, tokenService)
  try {
    const { id } = req.params
    const { status } = req.body
    await updateInvoiceStatusUsecase.handle({ invoiceToUpdate: { id, status }, token: req.token })
    res.status(200).send()
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const updateInvoice = async (req, res) => {
  const updateInvoiceUsecase = new UpdateInvoiceUsecase(invoiceRepository, userRepository, tokenService)
  try {
    const { id } = req.params
    const { invoice: invoiceToUpdate } = req.body

    await updateInvoiceUsecase.handle({ invoiceToUpdate, token: req.token })
    res.status(200).send()
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const removeInvoice = async (req, res) => {
  const deleteInvoiceUsecase = new DeleteInvoiceUsecase(invoiceRepository, userRepository, tokenService)
  try {
    const { id } = req.params

    await deleteInvoiceUsecase.handle({ id, token: req.token })
    res.status(200).send()
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const getAll = async (req, res) => {
  const getAllInvoiceUsecase = new GetAllInvoicesUsecase(invoiceRepository, tokenService, userRepository)
  try {
    const result = await getAllInvoiceUsecase.handle({ token: req.token })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getAllOwned = async (req, res) => {
  const getAllInvoiceUsecase = new GetAllInvoicesUsecase(invoiceRepository, tokenService, userRepository)
  try {
    const result = await getAllInvoiceUsecase.handle({ token: req.token, onlyOwned: true })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const getOneById = async (req, res) => {
  const getOneInvoiceUsecase = new GetOneInvoiceUsecase(invoiceRepository, userRepository, tokenService)
  try {
    const { id } = req.params
    let result = await getOneInvoiceUsecase.handle({ id, token: req.token })
    res.status(201).json(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const add = async (req, res) => {
  const postInvoiceUsecase = new PostInvoiceUsecase(invoiceRepository, tokenService)
  try {
    const { invoice }: { invoice: Invoice['data'] } = req.body
    const postInvoiceCommand: PostInvoiceCommand = {
      ...invoice,
      id: new ObjectId().toString() as any,
    }
    if (!!invoice.status && invoice.status === 'draft') {
      postInvoiceCommand.saveAsDraft = true
    }
    await postInvoiceUsecase.handle(postInvoiceCommand, req.token)
    res.status(201).send()
  } catch (error) {
    res.status(500).send('Une erreur est survenue sur le server.' + error.message)
  }
}
