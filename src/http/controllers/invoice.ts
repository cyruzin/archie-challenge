import { Request, Response } from 'express';
import { IInvoice } from '../../domain/invoice';
import { CreateInvoiceSchema, UpdateInvoiceSchema } from '../../validation/invoice';
import { IDSchema } from '../../validation/id';
import { InvoiceService } from '../../services/invoice';
import { EHTTP } from '../../enums/http-status-code';
import ValidationError from '../../errors/validation';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await InvoiceService.getAll();
    return res.status(EHTTP.StatusOK).json(result);
  } catch (err: any) {
    return res.status(err.status).json(err);
  }
};

export const getByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const idValidation = IDSchema.validate(id);
    if (idValidation.error?.message) throw new ValidationError(idValidation.error?.message);

    const result = await InvoiceService.getByID(+id);
    return res.status(EHTTP.StatusOK).json(result);
  } catch (err: any) {
    return res.status(err.status).json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const client = {
      ...req.body,
      user_id: +req.body.user_id,
      client_id: +req.body.client_id,
    } as IInvoice;

    const validation = CreateInvoiceSchema.validate(client);
    if (validation.error?.message) throw new ValidationError(validation.error?.message);

    await InvoiceService.create(client);
    return res.status(EHTTP.StatusCreated).json({ message: 'Created' });
  } catch (err: any) {
    return res.status(err.status).json(err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const idValidation = IDSchema.validate(id);
    if (idValidation.error?.message) throw new ValidationError(idValidation.error?.message);

    const client = {
      ...req.body,
      id: +id,
      user_id: +req.body.user_id,
      client_id: +req.body.client_id,
    } as IInvoice;

    const validation = UpdateInvoiceSchema.validate(client);
    if (validation.error?.message) throw new ValidationError(validation.error?.message);

    await InvoiceService.update(client);
    return res.status(EHTTP.StatusOK).json({ message: 'Updated' });
  } catch (err: any) {
    return res.status(err.status).json(err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const idValidation = IDSchema.validate(id);
    if (idValidation.error?.message) throw new ValidationError(idValidation.error?.message);

    await InvoiceService.remove(+id);
    return res.status(EHTTP.StatusOK).send({ message: 'Removed' });
  } catch (err: any) {
    return res.status(err.status).json(err);
  }
};

export default {
  getAll,
  getByID,
  create,
  update,
  remove,
};
