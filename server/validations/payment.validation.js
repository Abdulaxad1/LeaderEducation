import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  studentId: fields.requiredText(1, 40),
  amount: Joi.number().integer().min(0).required(),
  month: Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])$/).required(),
  status: Joi.string().valid("to'landi", 'kutilmoqda').allow('', null),
  method: Joi.string().valid('-', 'naqd', 'karta', 'o‘tkazma').allow('', null),
  date: fields.date,
});

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
