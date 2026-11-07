import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  name: fields.requiredText(2, 160),
  category: Joi.string().valid('Darslik', 'Metodik', 'Jihoz').required(),
  courseId: fields.text(40),
  quantity: Joi.number().integer().min(0).required(),
  unit: fields.text(40),
});

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
