import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  fullName: fields.requiredText(3, 120),
  phone: fields.requiredPhone,
  birthDate: fields.requiredDate,
  parentPhone: fields.phone,
  groupId: fields.text(40),
  status: Joi.string().valid('active', 'paused', 'graduated').allow('', null),
  balance: Joi.number().allow('', null),
});

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
