import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  groupId: fields.requiredText(1, 40),
  title: fields.requiredText(2, 160),
  dueDate: fields.requiredDate,
  description: fields.text(2000),
});

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
