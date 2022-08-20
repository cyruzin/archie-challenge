import { IUser, IUserRepository } from '../domain/user';
import ResourceNotFoundError from '../errors/resource-not-found';
import { postgres } from '../config/database';

async function getAll(): Promise<IUser[]> {
  try {
    const result = await postgres.query(
      'SELECT id, name, created_at, updated_at FROM users ORDER BY id DESC LIMIT 100',
    );

    return result.rows;
  } catch (err) {
    throw err;
  }
}

async function getByID(id: number): Promise<IUser> {
  try {
    const result = await postgres.query(
      'SELECT id, name, created_at, updated_at FROM users WHERE id = $1',
      [id],
    );

    if (!result.rows[0])
      throw new ResourceNotFoundError('The ID you are looking for could not found');

    return result.rows[0] as IUser;
  } catch (err) {
    throw err;
  }
}

async function create(user: IUser): Promise<void> {
  try {
    await postgres.query('INSERT INTO users (name) VALUES($1)', [user.name]);
  } catch (err) {
    throw err;
  }
}

async function update(user: IUser): Promise<void> {
  try {
    const updated_at = new Date();

    await postgres.query('UPDATE users SET name = $1, updated_at = $2 WHERE id = $3', [
      user.name,
      updated_at,
      user.id,
    ]);
  } catch (err) {
    throw err;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await postgres.query('DELETE FROM users WHERE id = $1', [id]);
  } catch (err) {
    throw err;
  }
}

export const UserRepository: IUserRepository = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
