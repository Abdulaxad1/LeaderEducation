import Joi from "joi";
import { validate } from "./validate.js";

const loginSchema = Joi.object({
  username: Joi.string().trim().lowercase().min(3).max(40).required(),
  password: Joi.string().min(6).max(128).required(),
});

const registerSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(120).required(),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9]{9,15}$/)
    .required(),
  username: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9_.]{3,40}$/)
    .required(),
  password: Joi.string().min(6).max(128).required(),
});

export const validateLogin = validate(loginSchema);
export const validateRegister = validate(registerSchema);
