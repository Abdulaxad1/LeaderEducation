import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  fullName: fields.requiredText(3, 120),
  specialty: fields.requiredText(2, 120),
  phone: fields.requiredPhone,
  experience: fields.text(80),
  courseIds: Joi.array().items(Joi.string().trim().min(1).max(40)).allow(null),
});

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
