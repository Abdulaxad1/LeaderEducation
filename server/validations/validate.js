import Joi from 'joi';

const VALIDATION_OPTIONS = {
  abortEarly: true,
  convert: true,
  stripUnknown: { objects: true, arrays: false },
};

export const validate = (schema, { partial = false, emptyMessage } = {}) => {
  const activeSchema = partial
    ? schema.fork(Object.keys(schema.describe().keys), (field) => field.optional())
    : schema;

  return (req, res, next) => {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        error: "So'rov tanasi JSON obyekt bo'lishi kerak",
      });
    }

    const { error, value } = activeSchema.validate(req.body, VALIDATION_OPTIONS);
    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }
    if (partial && Object.keys(value).length === 0) {
      return res.status(400).json({
        success: false,
        error: emptyMessage || 'Yangilash uchun kamida bitta maydon yuboring',
      });
    }

    req.body = value;
    return next();
  };
};

const validCalendarDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

export const fields = {
  text: (max = 200) => Joi.string().trim().max(max).allow('', null),
  requiredText: (min = 1, max = 200) => Joi.string().trim().min(min).max(max).required(),
  phone: Joi.string().trim().pattern(/^\+?[0-9]{9,15}$/).allow('', null),
  requiredPhone: Joi.string().trim().pattern(/^\+?[0-9]{9,15}$/).required(),
  date: Joi.string()
    .custom((value, helpers) => (validCalendarDate(value) ? value : helpers.error('any.invalid')))
    .messages({ 'any.invalid': "{{#label}} YYYY-MM-DD formatida to'g'ri sana bo'lishi kerak" })
    .allow('', null),
  requiredDate: Joi.string()
    .custom((value, helpers) => (validCalendarDate(value) ? value : helpers.error('any.invalid')))
    .messages({ 'any.invalid': "{{#label}} YYYY-MM-DD formatida to'g'ri sana bo'lishi kerak" })
    .required(),
  id: Joi.string().trim().pattern(/^[A-Za-z]+-[A-Za-z0-9-]+$/).allow('', null),
  money: Joi.number().integer().min(0).allow('', null),
  positiveInteger: Joi.number().integer().min(0).allow('', null),
};
