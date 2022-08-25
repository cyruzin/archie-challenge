import Joi from 'joi';
import { IUser } from 'domain/user';

export const CreateUserSchema = Joi.object<IUser>({
  name: Joi.string().min(2).max(100).required(),
});

export const UpdateUserSchema = Joi.object<IUser>({
  id: Joi.number().required(),
  name: Joi.string().min(2).max(100).required(),
});
