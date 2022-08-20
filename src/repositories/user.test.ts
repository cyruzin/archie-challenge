import { Pool } from 'pg';
import { IUser } from '../domain/user';
import { UserRepository } from './user';

jest.mock('pg', () => {
  const mPool = {
    connect: function () {
      return { query: jest.fn() };
    },
    query: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

let pool: any;
beforeEach(() => {
  pool = new Pool();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('user repository - getAll success', () => {
  test('should return all users', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: 'John Doe',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Jane Doe',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });
    await UserRepository.getAll();
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('user repository - getByID success', () => {
  test('should return a repository by ID', async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: 'John Doe',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    });

    await UserRepository.getByID(1);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('user repository - create success', () => {
  test('should create a new repository', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const mockUser: IUser = {
      name: 'John Doe',
    };

    await UserRepository.create(mockUser);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('user repository - update success', () => {
  test('should update a repository', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    const mockUser: IUser = {
      name: 'John Doe',
    };

    await UserRepository.update(mockUser);
    expect(pool.query).toBeCalledTimes(1);
  });
});

describe('user repository - remove success', () => {
  test('should remove a repository', async () => {
    pool.query.mockResolvedValue({ rows: [] });

    await UserRepository.remove(1);
    expect(pool.query).toBeCalledTimes(1);
  });
});
