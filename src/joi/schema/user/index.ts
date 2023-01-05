import * as Joi from 'joi'

export const userSchema = Joi.object({
  id: Joi.string().allow(null).empty('').optional(),
  email: Joi.string().email().required().not().empty(),
  password: Joi.string().required().not().empty(),
})
