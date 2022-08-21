import { Request, Response } from 'express';
import { IUser } from 'domain/user';
import { CreateUserSchema, UpdateUserSchema } from '../../validation/user';
import { IDSchema } from '../../validation/id';
import { UserService } from '../../services/user';
import { EHTTP } from '../../enums/http-status-code';
import ValidationError from '../../errors/validation';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await UserService.getAll();
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

    const result = await UserService.getByID(+id);
    return res.status(EHTTP.StatusOK).json(result);
  } catch (err: any) {
    return res.status(err.status).json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const user = req.body as IUser;

    const validation = CreateUserSchema.validate(user);
    if (validation.error?.message) throw new ValidationError(validation.error?.message);

    await UserService.create(user);
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

    const user = {
      ...req.body,
      id: +id,
    } as IUser;

    const validation = UpdateUserSchema.validate(user);
    if (validation.error?.message) throw new ValidationError(validation.error?.message);

    await UserService.update(user);
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

    await UserService.remove(+id);
    return res.status(EHTTP.StatusOK).send({ message: 'Removed' });
  } catch (err: any) {
    return res.send(err);
  }
};

export default {
  getAll,
  getByID,
  create,
  update,
  remove,
};
