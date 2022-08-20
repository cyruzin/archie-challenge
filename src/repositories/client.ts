import { IClient, IClientRepository } from '../domain/client';
import ResourceNotFoundError from '../errors/resource-not-found';
import { postgres } from '../config/database';

async function getAll(): Promise<IClient[]> {
  try {
    const result = await postgres.query(
      'SELECT id, name, created_at, updated_at FROM clients ORDER BY id DESC LIMIT 100',
    );

    return result.rows;
  } catch (err) {
    throw err;
  }
}

async function getByID(id: number): Promise<IClient> {
  try {
    const result = await postgres.query(
      'SELECT id, name, created_at, updated_at FROM clients WHERE id = $1',
      [id],
    );

    if (!result.rows[0])
      throw new ResourceNotFoundError('The ID you are looking for could not found');

    return result.rows[0] as IClient;
  } catch (err) {
    throw err;
  }
}

async function create(client: IClient): Promise<void> {
  try {
    await postgres.query('INSERT INTO clients (name) VALUES($1)', [client.name]);
  } catch (err) {
    throw err;
  }
}

async function update(client: IClient): Promise<void> {
  try {
    const updated_at = new Date();

    await postgres.query('UPDATE clients SET name = $1, updated_at = $2 WHERE id = $3', [
      client.name,
      updated_at,
      client.id,
    ]);
  } catch (err) {
    throw err;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await postgres.query('DELETE FROM clients WHERE id = $1', [id]);
  } catch (err) {
    throw err;
  }
}

export const ClientRepository: IClientRepository = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
