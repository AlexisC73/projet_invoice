import { invoiceSchema } from '../../../joi/schema/invoice'
import { createMongoInvoice, returnInvoice } from '../../../utils'
import * as invoiceModel from '../../model/invoice'

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    if (!id) throw new Error('No id provided')
    const fundInvoice = await invoiceModel.getOneById(id)
    if (!fundInvoice) throw new Error('No invoice found with id => ' + id)
    if (!fundInvoice.isOwner(req.user.id)) {
      throw new Error('You are not the owner of this invoice')
    }
    const result = await invoiceModel.updateStatus(fundInvoice, status)
    res.send('Invoice status updated with id => ' + result._id)
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params
    const { invoice } = req.body
    if (!id) throw new Error('No id provided')
    await invoiceSchema.validateAsync(invoice)
    const fundInvoice = await invoiceModel.getOneById(id)
    if (!fundInvoice) throw new Error('No invoice found with id => ' + id)
    if (!fundInvoice.isOwner(req.user.id)) {
      throw new Error('You are not the owner of this invoice')
    }
    const result = await invoiceModel.updateInvoice(fundInvoice, invoice)
    res.send('Invoice updated with id => ' + result._id)
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const removeInvoice = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) throw new Error('No id provided')
    const fundInvoice = await invoiceModel.getOneById(id)
    if (!fundInvoice) throw new Error('No invoice found with id => ' + id)
    if (!fundInvoice.isOwner(req.user.id)) {
      throw new Error('You are not the owner of this invoice')
    }
    const result = await invoiceModel.removeInvoice(fundInvoice)
    res.send('Invoice removed with id => ' + result._id)
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const getAll = async (req, res) => {
  try {
    const result = await invoiceModel.getAll()
    const jsonResult = result
      .filter(mongoInvoice => mongoInvoice.isOwner(req.user.id))
      .map(invoice => returnInvoice(invoice))
    res.json(jsonResult)
  } catch (error) {
    res.status(500).send('Une erreur est survenue sur le server.')
  }
}

export const getOneById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) throw new Error('No id provided')
    let result = await invoiceModel.getOneById(id)
    res.json(returnInvoice(result))
  } catch (error) {
    res.status(500).send('Une erreur est survenue sur le server.')
  }
}

export const add = async (req, res) => {
  try {
    const { invoice } = req.body
    invoice.owner = req.user.id
    await invoiceSchema.validateAsync(invoice)
    const mongoInvoice = createMongoInvoice(invoice)
    const savedInvoice = await invoiceModel.addNewInvoice(mongoInvoice)
    res.send('Invoice save with id => ' + savedInvoice._id)
  } catch (error) {
    res.status(500).send('Une erreur est survenue sur le server.' + error.message)
  }
}
