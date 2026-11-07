import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  fullName: fields.requiredText(3, 120),
  position: fields.requiredText(2, 100),
  department: fields.requiredText(2, 100),
  phone: fields.phone,
  salary: Joi.number().integer().min(0).required(),
  hiredAt: fields.date,
  status: Joi.string().valid('active', 'inactive').allow('', null),
});

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
