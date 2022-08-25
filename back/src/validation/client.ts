import Joi from 'joi';
import { IClient } from 'domain/client';

export const CreateClientSchema = Joi.object<IClient>({
  name: Joi.string().min(2).max(100).required(),
});

export const UpdateClientSchema = Joi.object<IClient>({
  id: Joi.number().required(),
  name: Joi.string().min(2).max(100).required(),
});
