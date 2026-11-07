import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  name: fields.requiredText(2, 120),
  category: Joi.string().valid('til', 'IT', 'fan').required(),
  level: fields.text(80),
  duration: fields.text(80),
  price: Joi.number().integer().min(0).required(),
  description: fields.text(1000),
});

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
