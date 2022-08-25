import { Request, Response } from 'express';
import { IClient } from 'domain/client';
import { CreateClientSchema, UpdateClientSchema } from '../../validation/client';
import { IDSchema } from '../../validation/id';
import { ClientService } from '../../services/client';
import { EHTTP } from '../../enums/http-status-code';
import ValidationError from '../../errors/validation';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await ClientService.getAll();
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

    const result = await ClientService.getByID(+id);
    return res.status(EHTTP.StatusOK).json(result);
  } catch (err: any) {
    return res.status(err.status).json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const client = req.body as IClient;

    const validation = CreateClientSchema.validate(client);
    if (validation.error?.message) throw new ValidationError(validation.error?.message);

    await ClientService.create(client);
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
    } as IClient;

    const validation = UpdateClientSchema.validate(client);
    if (validation.error?.message) throw new ValidationError(validation.error?.message);

    await ClientService.update(client);
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

    await ClientService.remove(+id);
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
