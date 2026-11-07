import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  groupId: fields.requiredText(1, 40),
  studentId: fields.requiredText(1, 40),
  date: fields.requiredDate,
  status: Joi.string().valid('keldi', 'kelmadi', 'kechikdi').required(),
  notes: fields.text(500),
});

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
