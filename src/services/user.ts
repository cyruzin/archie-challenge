import { IUser, IUserService } from '../domain/user';
import { UserRepository } from '../repositories/user';

async function getAll(): Promise<IUser[]> {
  try {
    return await UserRepository.getAll();
  } catch (err) {
    throw err;
  }
}

async function getByID(id: number): Promise<IUser> {
  try {
    return await UserRepository.getByID(id);
  } catch (err) {
    throw err;
  }
}

async function create(user: IUser): Promise<void> {
  try {
    await UserRepository.create(user);
  } catch (err) {
    throw err;
  }
}

async function update(user: IUser): Promise<void> {
  try {
    await UserRepository.getByID(Number(user?.id));
    await UserRepository.update(user);
  } catch (err) {
    throw err;
  }
}

async function remove(id: number): Promise<void> {
  try {
    await UserRepository.getByID(id);
    await UserRepository.remove(id);
  } catch (err) {
    throw err;
  }
}

export const UserService: IUserService = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
