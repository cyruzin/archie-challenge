import { IClient, IClientService } from '../domain/client';
import { ClientRepository } from '../repositories/client';

async function getAll(): Promise<IClient[]> {
  try {
    return await ClientRepository.getAll();
  } catch (err) {
    throw err;
  }
}

async function getByID(id: number): Promise<IClient> {
  try {
    return await ClientRepository.getByID(id);
  } catch (err) {
    throw err;
  }
}

async function create(client: IClient): Promise<void> {
  try {
    await ClientRepository.create(client);
  } catch (err) {
    throw err;
  }
}

async function update(client: IClient): Promise<void> {
  try {
    await ClientRepository.getByID(Number(client?.id));
    await ClientRepository.update(client);
  } catch (err) {
    throw err;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await ClientRepository.getByID(id);
    await ClientRepository.remove(id);
  } catch (err) {
    throw err;
  }
}

export const ClientService: IClientService = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
