import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  studentId: fields.requiredText(1, 40),
  courseId: fields.requiredText(1, 40),
  issueDate: fields.requiredDate,
  grade: Joi.string().valid("A'lo", 'Yaxshi', 'Qoniqarli').allow('', null),
});

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
