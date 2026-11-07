import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  name: fields.requiredText(2, 120),
  courseId: fields.requiredText(1, 40),
  teacherId: fields.requiredText(1, 40),
  schedule: fields.requiredText(2, 120),
  room: fields.text(80),
  capacity: Joi.number().integer().min(1).allow('', null),
  startDate: fields.date,
});

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
