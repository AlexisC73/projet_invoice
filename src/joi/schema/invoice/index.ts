import * as Joi from 'joi'

export const invoiceSchema = Joi.object({
  id: Joi.string().allow(null).empty('').optional(),
  date: Joi.date().required().not().empty(),
  dueDate: Joi.date().required().not().empty(),
  description: Joi.string().allow(null).empty('').optional(),
  currency: Joi.string().allow(null).empty('').optional(),
  status: Joi.string().valid('paid', 'pending', 'draft'),
  contact: Joi.string().email().required().not().empty(),
  owner: Joi.string().required().not().empty(),
  sender: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  buyer: Joi.object({
    name: Joi.string().required().not().empty(),
    address: Joi.object({
      street: Joi.string().required().not().empty(),
      city: Joi.string().required().not().empty(),
      zip: Joi.string().required().not().empty(),
      country: Joi.string().required().not().empty(),
    }).required(),
  }),
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required().not().empty(),
        name: Joi.string().required().not().empty(),
        quantity: Joi.string().required().not().empty().pattern(/^\d+$/),
        unitPrice: Joi.string()
          .required()
          .not()
          .empty()
          .pattern(/^\d+(\.\d+)?$/),
        description: Joi.string().allow(null).empty('').optional(),
      })
    )
    .required(),
})
