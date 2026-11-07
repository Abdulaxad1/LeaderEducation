import Joi from 'joi';
import { fields, validate } from './validate.js';

const schema = Joi.object({
  studentId: fields.requiredText(1, 40),
  courseId: fields.requiredText(1, 40),
  examName: fields.requiredText(1, 120),
  score: Joi.number().min(0).max(100).required(),
  maxScore: Joi.number().positive().allow('', null),
  date: fields.date,
  notes: fields.text(500),
}).custom((value, helpers) => {
  if (value.score !== undefined && value.maxScore !== undefined && value.score > value.maxScore) {
    return helpers.error('any.invalid');
  }
  return value;
}).messages({ 'any.invalid': "Ball maksimal balldan yuqori bo'lishi mumkin emas" });

export const validateCreate = validate(schema);
export const validateUpdate = validate(schema, { partial: true });
