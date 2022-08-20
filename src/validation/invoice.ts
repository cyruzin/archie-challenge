import Joi from 'joi';
import { IInvoice, EInvoiceStats } from '../domain/invoice';

export const CreateInvoiceSchema = Joi.object<IInvoice>({
  user_id: Joi.number().positive().required(),
  client_id: Joi.number().positive().required(),
  items: Joi.array()
    .items({
      title: Joi.string().min(5).max(100).required(),
      description: Joi.string().min(5).max(500).required(),
      quantity: Joi.number().positive().required(),
      rate: Joi.number().required(),
    })
    .min(1),
});

export const UpdateInvoiceSchema = Joi.object<IInvoice>({
  id: Joi.number().required(),
  user_id: Joi.number().positive().required(),
  client_id: Joi.number().positive().required(),
  items: Joi.array()
    .items({
      id: Joi.number().positive().required(),
      title: Joi.string().min(5).max(100).required(),
      description: Joi.string().min(5).max(500).required(),
      quantity: Joi.number().positive().required(),
      rate: Joi.number().required(),
    })
    .min(1),
  status: Joi.string()
    .valid(EInvoiceStats.PENDING, EInvoiceStats.APPROVED, EInvoiceStats.CANCELED)
    .required(),
});
