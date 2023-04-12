import * as invoiceModel from '../../model/invoice'

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    await invoiceModel.updateStatus(id, status)
    res.status(200).send()
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params
    const { invoice: updateInvoiceCommand } = req.body

    await invoiceModel.updateInvoice(id, updateInvoiceCommand)
    res.status(200).send()
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const removeInvoice = async (req, res) => {
  try {
    const { id } = req.params

    await invoiceModel.removeInvoice(id)
    res.status(200).send()
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export const getAll = async (req, res) => {
  try {
    const result = await invoiceModel.getAll()
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

export const getOneById = async (req, res) => {
  try {
    const { id } = req.params
    let result = await invoiceModel.getOneById(id)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export const add = async (req, res) => {
  try {
    const { invoice } = req.body
    await invoiceModel.addNewInvoice({ ...invoice, owner: req.user.id })
    res.status(201).send()
  } catch (error) {
    res.status(500).send('Une erreur est survenue sur le server.' + error.message)
  }
}
