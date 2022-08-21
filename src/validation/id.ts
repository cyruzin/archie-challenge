import Joi from 'joi';

export const IDSchema = Joi.string().regex(/^\d+$/, 'ID').required();
